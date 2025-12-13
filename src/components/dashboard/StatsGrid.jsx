import StatCard from "../ui/StatCard";

export default function StatsGrid({ data }) {
  return (
    <div className="grid-4" style={{ marginTop: 32 }}>
      {data.map((item, i) => (
        <StatCard key={i} {...item} />
      ))}
    </div>
  );
}
