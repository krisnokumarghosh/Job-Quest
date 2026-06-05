import StatCard from "./StatCard";

const StatsSection = ({ statsData }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 mt-16">
      {statsData.map((stat, index) => (
        <StatCard
        key={index}
        label={stat.label}
        icon={stat.icon}
        value={stat.value}
        />
      ))}
    </div>
  );
};

export default StatsSection;
