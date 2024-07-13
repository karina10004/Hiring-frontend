import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect, useCallback } from "react";
import { useSocket } from "../../context/SocketProvider";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { List, Button, Card, Typography } from "antd";

const { Title } = Typography;

const Room = () => {
  const { interviewId, processId } = useParams();
  const interviewerId = jwtDecode(localStorage.getItem("access_token")).id;
  const socket = useSocket();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [candidateStatus, setCandidateStatus] = useState({});
  const [callingCandidateId, setCallingCandidateId] = useState(null);

  const handleInterviewerRoomJoined = useCallback(({ id }) => {
    setId(id);
  }, []);

  const handleCandidateJoinedRoom = useCallback(({ candidateId }) => {
    setCandidateStatus((prevStatus) => ({
      ...prevStatus,
      [candidateId]: true,
    }));
  }, []);

  const handleCandidateLeftRoom = useCallback(({ candidateId }) => {
    setCandidateStatus((prevStatus) => ({
      ...prevStatus,
      [candidateId]: false,
    }));
  }, []);

  const getCandidateInfo = (candidateId) => {
    return candidates.find((candidate) => candidate._id === candidateId);
  };

  const getRegistrationData = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/register/get/${processId}`
    );
    const { data } = response;
    const filteredCandidates = data.listRegistrations.filter((registration) =>
      registration.interviewSlots.some(
        (slot) =>
          slot.interviewId === interviewId &&
          slot.interviewerId === interviewerId
      )
    );
    setRegistrations(filteredCandidates);
    setCandidates(data.candidates);
  };

  const callCandidate = (candidateId) => {
    setCallingCandidateId(candidateId);
    socket.emit("call:candidate", {
      interviewId,
      candidateId,
      remotePeerId: id,
    });
  };

  const handleCallAccepted = useCallback(
    async ({ candidateSocketId, interviewerSocketId }) => {
      localStorage.setItem("peerId", interviewerSocketId);
      localStorage.setItem("remotePeerId", candidateSocketId);
      navigate(`/interview/admin/${processId}/${interviewId}`);
    },
    []
  );

  useEffect(() => {
    socket.emit("interviewer:join:room", { interviewId });
    socket.on("interviewer:room:joined", handleInterviewerRoomJoined);
    socket.on("candidate:join:room", handleCandidateJoinedRoom);
    socket.on("candidate:leave:room", handleCandidateLeftRoom);
    socket.on("call:accepted", handleCallAccepted);
    getRegistrationData();
    return () => {
      socket.off("interviewer:room:joined", handleInterviewerRoomJoined);
      socket.off("candidate:join:room", handleCandidateJoinedRoom);
      socket.off("candidate:leave:room", handleCandidateLeftRoom);
      socket.off("call:accepted", handleCallAccepted);
    };
  }, [
    handleInterviewerRoomJoined,
    handleCandidateJoinedRoom,
    handleCandidateLeftRoom,
    interviewId,
    processId,
    interviewerId,
    socket,
  ]);

  return (
    <div style={{ padding: "20px" }}>
      <Card>
        <Title level={2}>Interview Room</Title>
        <div>
          <Title level={4}>Candidate List</Title>
          <List
            itemLayout="horizontal"
            dataSource={registrations}
            renderItem={(registration) => {
              const candidate = getCandidateInfo(registration.candidateId);
              const isJoined = candidateStatus[registration.candidateId];
              return (
                <List.Item
                  actions={[
                    candidate && (
                      <Button
                        type="primary"
                        disabled={
                          !isJoined ||
                          callingCandidateId === registration.candidateId
                        }
                        onClick={() => callCandidate(registration.candidateId)}
                      >
                        {callingCandidateId === registration.candidateId
                          ? "Calling..."
                          : "Call"}
                      </Button>
                    ),
                  ]}
                >
                  <List.Item.Meta
                    title={
                      candidate
                        ? candidate.name
                        : "Candidate information not available"
                    }
                    description={candidate ? candidate.email : ""}
                  />
                </List.Item>
              );
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default Room;
