import React, { useEffect, useState, useRef } from "react";
import { useSocket } from "../../context/SocketProvider";
import { useParams } from "react-router-dom";
import { Typography, Card, Button, Space } from "antd";
import {
  CloseOutlined,
  VideoCameraOutlined,
  VideoCameraAddOutlined,
  AudioOutlined,
  AudioMutedOutlined,
} from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";
import Peer from "peerjs";

const { Title } = Typography;

const CandidateInterview = () => {
  const { interviewId } = useParams();
  const socket = useSocket();
  const [socketId, setSocketId] = useState("");
  const [remoteSocketId, setRemoteSocketId] = useState("");
  const [peer, setPeer] = useState(null);
  const [remotePeerId, setRemotePeerId] = useState("");
  const [isCalling, setIsCalling] = useState(false);
  const [peerId, setPeerId] = useState("");
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const peerInstance = useRef(null);

  const id = jwtDecode(localStorage.getItem("access_token")).id;

  const handleBeforeUnload = () => {
    socket.emit("candidate:leave:room", { interviewId });
  };

  const callPeer = (remoteId) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const call = peerInstance.current.call(remoteId, stream);
        setLocalStream(stream);

        call.on("stream", (remoteStream) => {
          setRemoteStream(remoteStream);
        });
      });
  };

  const handleAcceptCall = () => {
    setIsCalling(false);
    socket.emit("call:accepted", {
      interviewerSocketId: remoteSocketId,
      candidateSocketId: socketId,
    });
  };

  useEffect(() => {
    socket.emit("candidate:join:room", { interviewId, candidateId: id });
    socket.on("joined:room", ({ socketId }) => {
      setSocketId(socketId);
    });

    socket.on("call:request", ({ candidateId, remotePeerId }) => {
      setRemoteSocketId(remotePeerId);
      setIsCalling(true);
    });
    socket.on("call:me", ({ remoteSocketId, remotePeerId }) => {
      callPeer(remotePeerId);

      socket.emit("id:transfer", { remoteSocketId, candidateId });
    });
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      socket.off("interview:call");
      socket.off("joined:room");
      socket.off("call:request");
      socket.off("call:me");
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [interviewId, socket]);

  useEffect(() => {
    const peer = new Peer();
    peer.on("open", (id) => {
      setPeerId(id);
    });

    peer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          call.answer(stream);
          setLocalStream(stream);

          call.on("stream", (remoteStream) => {
            setRemoteStream(remoteStream);
          });
        });
    });

    peerInstance.current = peer;
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
    window.location.reload();
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
    <div style={{ padding: "20px" }}>
      <Card>
        <Title level={2}>Waiting for Interview</Title>
        {isCalling && (
          <Button type="primary" onClick={handleAcceptCall}>
            Accept Call from Interviewer
          </Button>
        )}
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
    </div>
  );
};

export default CandidateInterview;
