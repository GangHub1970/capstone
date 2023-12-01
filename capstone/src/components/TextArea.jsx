import React from "react";
import { Textarea } from "@material-tailwind/react";

export default function TextArea({ text, onChange }) {
  const handleTextChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <article className="flex flex-col gap-2 mb-8 w-full">
      <label htmlFor="text" className="text-lg font-semibold">
        텍스트를 입력해주세요.
      </label>
      <Textarea
        id="text"
        placeholder="예) 안녕하세요. 부산대학교 수학과 OOO입니다."
        className="!border !border-gray-300 bg-white !text-base text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
        labelProps={{ className: "hidden" }}
        containerProps={{ className: "min-w-[400px]" }}
        value={text}
        onChange={handleTextChange}
      />
    </article>
  );
}
