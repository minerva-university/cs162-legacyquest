// A linear progress bar that displays a tasks's progress
// No longer used, but kept for reference
export default function LinearProgress({value, height, barStartColor, barEndColor, backgroundColor, borderRadius}) {
  return (
    <div style={{width: '100%', height: height, backgroundColor: backgroundColor, borderRadius, overflow: 'hidden'}}>
      <div style={{width: `${value}%`, height: '100%', background: `linear-gradient(90deg, ${barStartColor}, ${barEndColor})`, borderRadius}}></div>
    </div>
  )
}