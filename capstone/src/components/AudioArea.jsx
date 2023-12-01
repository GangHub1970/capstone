import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { MdOutlineReplay } from "react-icons/md";
import { GiSoundWaves } from "react-icons/gi";
import { Button } from "@material-tailwind/react";

const CONDITIONS = [
  "배경음악이 없어야 합니다.",
  "단독 목소리이어야 합니다.",
  "말하기 또는 노래 데이터 사용 가능합니다.",
  "파일 형태는 Wav이어야 합니다.",
  "파일명은 고유해야 하며, 공백이 있으면 안됩니다.",
  "15분 이상의 음성 데이터가 필요합니다.",
];

export default function AudioArea({
  audioRef,
  audioFile,
  onFileChange,
  onReset,
}) {
  const handleUploadClick = () => {
    audioRef.current?.click();
  };

  return (
    <article className="flex flex-col gap-2 mb-8 w-full">
      <p className="text-lg font-semibold">
        다음 조건에 맞는 음성 파일을 업로드해주세요.
      </p>
      <ul>
        {CONDITIONS.map((condition, index) => (
          <li key={index} className="flex items-center gap-3">
            <FiCheckCircle className=" text-green-600" />
            <p>{condition}</p>
          </li>
        ))}
      </ul>
      {audioFile ? (
        <div className="flex justify-between items-center gap-4 w-full mt-4">
          <audio controls className="grow">
            <source src={audioFile} type="audio/wav" />
            브라우저가 audio 태그를 지원하지 않습니다!
          </audio>
          <MdOutlineReplay
            className="cursor-pointer"
            size={28}
            onClick={onReset}
          />
        </div>
      ) : (
        <div>
          <Button
            variant="outlined"
            className="w-full border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-0 focus:bg-gray-50"
            onClick={handleUploadClick}
          >
            <GiSoundWaves size={40} className="mx-auto text-gray-400" />
            <p className="mt-2 text-sm font-semibold text-gray-600">
              음성파일 선택하기
            </p>
          </Button>
          <input
            ref={audioRef}
            id="inputFile"
            type="file"
            className="hidden"
            accept=".wav"
            onChange={onFileChange}
          />
        </div>
      )}
    </article>
  );
}
