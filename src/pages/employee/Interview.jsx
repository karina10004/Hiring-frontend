import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Card,
  Button,
  Space,
  Form,
  Input,
  Select,
  message,
} from "antd";
import { useSocket } from "../../context/SocketProvider";
import {
  CloseOutlined,
  VideoCameraOutlined,
  VideoCameraAddOutlined,
  AudioOutlined,
  AudioMutedOutlined,
} from "@ant-design/icons";
import Peer from "peerjs";
import axios from "axios";

const { Title } = Typography;
const { Option } = Select;

const Interview = () => {
  const { interviewId, processId } = useParams();
  const navigate = useNavigate();
  const socket = useSocket();
  const [peer, setPeer] = useState(null);
  const [peerId, setPeerId] = useState("");
  const [remoteStream, setRemoteStream] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [candidateId, setCandidateId] = useState("");

  useEffect(() => {
    const peerInstance = new Peer();
    setPeer(peerInstance);
    socket.on("id:transfer", ({ candidateId }) => {
      console.log(candidateId);
      setCandidateId(candidateId);
    });
    peerInstance.on("open", (id) => {
      setPeerId(id);
      const remoteSocketId = localStorage.getItem("remotePeerId");
      socket.emit("call:me", { remotePeerId: id, remoteSocketId });
    });

    peerInstance.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setLocalStream(stream);
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            setRemoteStream(remoteStream);
          });
        });
    });

    return () => {
      if (peerInstance) {
        peerInstance.destroy();
      }
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      socket.off("id:transfer");
    };
  }, []);

  const toggleCamera = () => {
    localStream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsCameraOn(!isCameraOn);
  };

  const toggleMic = () => {
    localStream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsMicOn(!isMicOn);
  };

  const leaveCall = () => {
    peer.destroy();
    navigate(`/`);
  };

  const onFinish = async (values) => {
    try {
      await axios.post(`http://localhost:8000/api/result/create`, {
        ...values,
        roundId: interviewId,
        roundType: "interview",
        candidateId,
      });
      message.success("Result submitted successfully");
    } catch (error) {
      message.error("Failed to submit the result");
    }
  };

  useEffect(() => {
    const localVideo = document.getElementById("localVideo");
    const remoteVideo = document.getElementById("remoteVideo");

    if (localVideo && localStream) {
      localVideo.srcObject = localStream;
    }

    if (remoteVideo && remoteStream) {
      remoteVideo.srcObject = remoteStream;
    }
  }, [localStream, remoteStream]);

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      <Card style={{ flex: 1, marginRight: "20px" }}>
        <Title level={2}>Interview</Title>
        <div>
          <video
            id="localVideo"
            autoPlay
            muted
            style={{ width: "300px", marginRight: "10px" }}
          />
          <video id="remoteVideo" autoPlay style={{ width: "300px" }} />
        </div>
        <Space style={{ marginTop: "20px" }}>
          <Button
            type="primary"
            icon={
              isCameraOn ? <VideoCameraOutlined /> : <VideoCameraAddOutlined />
            }
            onClick={toggleCamera}
          >
            {isCameraOn ? "Turn Camera Off" : "Turn Camera On"}
          </Button>
          <Button
            type="primary"
            icon={isMicOn ? <AudioOutlined /> : <AudioMutedOutlined />}
            onClick={toggleMic}
          >
            {isMicOn ? "Mute" : "Unmute"}
          </Button>
          <Button type="danger" icon={<CloseOutlined />} onClick={leaveCall}>
            Leave Call
          </Button>
        </Space>
      </Card>
      <Card style={{ width: "300px" }}>
        <Title level={3}>Submit Result</Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select a status" }]}
          >
            <Select placeholder="Select a status">
              <Option value="Pass">Passed</Option>
              <Option value="Fail">Failed</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="score"
            label="Score"
            rules={[{ required: true, message: "Please input a score" }]}
          >
            <Input type="number" placeholder="Enter score" />
          </Form.Item>
          <Form.Item
            name="feedback"
            label="Feedback"
            rules={[{ required: true, message: "Please input feedback" }]}
          >
            <Input.TextArea placeholder="Enter feedback" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Interview;
