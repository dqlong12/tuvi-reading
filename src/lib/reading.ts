export type ReadingInput = {
  name: string;
  gender: string;
  birthDate: string;
  birthTime?: string;
  birthTimeAccuracy: string;
  birthPlace: string;
  focusArea: string;
  lifeContext: string;
  question: string;
};

const tarot = [
  ["The Star", "Hy vọng được nuôi bằng một nhịp đi đều và thành thật."],
  ["The Hermit", "Câu trả lời rõ hơn khi bạn tách tiếng ồn khỏi điều mình thực sự biết."],
  ["Strength", "Sức mạnh lúc này nằm ở sự mềm dẻo, không phải ép mọi việc diễn ra."],
  ["Justice", "Hãy nhìn lại dữ kiện, ranh giới và phần trách nhiệm của mỗi bên."],
  ["The Chariot", "Một hướng đi dứt khoát sẽ tạo đà sau giai đoạn phân tán."],
  ["Temperance", "Hai điều tưởng đối lập có thể cùng tồn tại nếu bạn điều chỉnh nhịp độ."],
] as const;

function score(value: string) {
  return [...value].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

export function buildReading(input: ReadingInput) {
  const date = new Date(`${input.birthDate}T12:00:00.000Z`);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  const seed = score(`${input.name}${input.birthDate}${input.question}`);
  const card = tarot[seed % tarot.length];
  const element = ["Mộc", "Hỏa", "Thổ", "Kim", "Thủy"][(year + month) % 5];
  const rhythm = day % 2 === 0 ? "xây nền và củng cố" : "mở đường và thử nghiệm";

  return {
    headline: `${input.name}, giai đoạn này hợp với việc ${rhythm}`,
    overview: `Năng lượng ${element} nổi bật trong cách bạn tiếp cận chủ đề ${input.focusArea.toLowerCase()}. Bạn có xu hướng muốn nhìn thấy một tín hiệu chắc chắn trước khi hành động, trong khi hoàn cảnh hiện tại lại cần những bước nhỏ có thể kiểm chứng.`,
    tuvi: {
      title: "Tử Vi · nhịp vận",
      body: `Trục chính của lần luận này nằm ở khả năng phân bổ sức lực. Điều đáng ưu tiên không phải làm nhiều hơn, mà là chọn một cam kết đủ quan trọng để theo đến cùng. ${input.birthTimeAccuracy === "unknown" ? "Do chưa có giờ sinh chính xác, phần này được đọc theo xu hướng ngày sinh và không khẳng định cung vị chi tiết." : "Giờ sinh đã được đưa vào hồ sơ để định hướng nhịp đọc cá nhân."}`,
    },
    astrology: {
      title: "Chiêm tinh · góc nhìn",
      body: `Ngày ${day}/${month} gợi một cách xử lý thiên về trực giác nhưng vẫn cần bằng chứng thực tế. Với câu hỏi hiện tại, hãy phân biệt điều bạn mong muốn với điều đã thực sự được nói hoặc làm. Khi hai phần này khớp nhau, quyết định sẽ nhẹ hơn đáng kể.`,
    },
    tarot: {
      title: `Tarot · ${card[0]}`,
      body: card[1],
    },
    guidance: [
      "Chọn một hành động có thể hoàn thành trong 72 giờ.",
      "Ghi lại điều bạn đang giả định nhưng chưa kiểm chứng.",
      `Giữ câu hỏi trọng tâm: “${input.question}” và xem lại sau 14 ngày.`,
    ],
    note: "Bài luận mang tính chiêm nghiệm và định hướng cá nhân, không thay thế tư vấn y tế, pháp lý hoặc tài chính.",
  };
}
