import { Button } from "@material-tailwind/react";
import "./App.css";
import { Typography, Spinner } from "@material-tailwind/react";
import { MdKeyboardVoice } from "react-icons/md";
import { useRef, useState } from "react";
import TextArea from "./components/TextArea";
import AudioArea from "./components/AudioArea";
import downloadData from "./util/export";
import { conversion } from "./apis";

function App() {
  const inputRef = useRef(null);
  const [text, setText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleConversion = async () => {
    if (!text || !audioFile) return;

    try {
      setIsLoading(true);
      downloadData("test_11_28.txt", text);
      downloadData("bg.wav", audioBlob);
      const output = await conversion();
      console.log(output);
      setText("");
      setAudioFile(null);
      setAudioBlob(null);
      setIsLoading(false);
      setIsDone(true);
    } catch (error) {
      console.error("Error executing command:", error);
    }
  };

  // 음성 파일 업로드
  const handleFileChange = (e) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    setAudioBlob(file);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      const result = event?.target?.result;
      setAudioFile(result);
    };
  };
  const handleAudioResetClick = () => {
    setAudioFile(null);
    setAudioBlob(null);
  };
  const handleReset = () => {
    setIsDone(false);
    handleAudioResetClick();
    setText("");
  };

  return (
    <main className="flex flex-col items-center gap-4 py-20">
      <Typography variant="h1" color="white">
        AI Speech Conversion Service
      </Typography>
      <Typography variant="h6" color="white">
        Capstone Design Helper Team
      </Typography>
      <section className="flex flex-col items-center p-8 bg-white rounded-xl">
        {isLoading ? (
          <article className="px-20 text-center">
            <Typography variant="h5">변환 중입니다...</Typography>
            <Typography variant="h6">잠시만 기다려주세요.</Typography>
            <Spinner className="w-10 h-10 mx-auto my-8" />
          </article>
        ) : isDone ? (
          <article className="px-20 text-center">
            <Typography variant="h5">변환이 완료되었습니다.</Typography>
            <Typography variant="h6">
              다운로드 폴더에서 결과를 확인해주세요.
            </Typography>
            <Button className="mt-8" onClick={handleReset}>
              다시하기
            </Button>
          </article>
        ) : (
          <>
            <MdKeyboardVoice size={40} className="mb-2" />
            <TextArea text={text} onChange={setText} />
            <AudioArea
              audioRef={inputRef}
              audioFile={audioFile}
              onFileChange={handleFileChange}
              onReset={handleAudioResetClick}
            />
            <Button
              className="w-full text-md"
              size="md"
              onClick={handleConversion}
              disabled={!text || !audioFile}
            >
              변환하기
            </Button>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
