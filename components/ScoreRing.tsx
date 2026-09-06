/** TMDB-style user score dial. */
export default function ScoreRing({ score, size = 40 }: { score: number; size?: number }) {
  const stroke = 3
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const colour = score >= 70 ? "#22c55e" : score >= 50 ? "#facc15" : "#dc143c"

  return (
    <div
      className="relative grid place-items-center rounded-full bg-noir-950/85 backdrop-blur-sm"
      style={{ width: size + 6, height: size + 6 }}
      title={`${score}% user score`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colour}
          strokeOpacity={0.25}
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colour}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - score / 100)}
        />
      </svg>
      <span className="absolute text-[10px] font-bold text-white">
        {score}
        <span className="text-[7px] align-super">%</span>
      </span>
    </div>
  )
}
