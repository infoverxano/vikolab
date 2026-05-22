
function stringToColor(str = "") {
  const colors = [
    { bg: "#E6F1FB", text: "#0C447C" }, // blue
    { bg: "#E1F5EE", text: "#085041" }, // teal
    { bg: "#EEEDFE", text: "#3C3489" }, // purple
    { bg: "#FAECE7", text: "#712B13" }, // coral
    { bg: "#FBEAF0", text: "#72243E" }, // pink
    { bg: "#EAF3DE", text: "#27500A" }, // green
    { bg: "#FAEEDA", text: "#633806" }, // amber
  ];
  const index =
    [...str].reduce((acc, c) => acc + c.charCodeAt(0), 0) % colors.length;
  return colors[index];
}
// export default function ClientAvatar({ firstName = "", lastName = "", avatarUrl }) {
//   const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();
//   const { bg, text } = stringToColor(firstName + lastName);

//   if (avatarUrl) {
//     return (
//       <img
//         src={avatarUrl}
//         alt={`${firstName} ${lastName}`}
//         style={{
//           width: 36,
//           height: 36,
//           borderRadius: "50%",
//           objectFit: "cover",
//           border: "2px solid #f0f0f0",
//           flexShrink: 0,
//         }}
//       />
//     );
//   }

//   return (
//     <div
//       style={{
//         width: 36,
//         height: 36,
//         borderRadius: "50%",
//         background: bg,
//         color: text,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         fontWeight: 600,
//         fontSize: 13,
//         flexShrink: 0,
//         letterSpacing: "0.03em",
//       }}
//     >
//       {initials}
//     </div>
//   );
// }

export default function ClientAvatar({ firstName, lastName, avatarUrl, size = 36 }) {
  // ✅ handles null, undefined, and empty string safely
  const first = firstName?.trim() || "";
  const last  = lastName?.trim()  || "";
  const initials = `${first[0] || ""}${last[0] || ""}`.toUpperCase() || "?";

  const { bg, text } = stringToColor(first + last);

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={`${first} ${last}`}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          border: "2px solid #f0f0f0",
          flexShrink: 0,
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bg,
        color: text,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        fontSize: size * 0.36,
        flexShrink: 0,
        letterSpacing: "0.03em",
      }}
    >
      {initials}
    </div>
  );
}