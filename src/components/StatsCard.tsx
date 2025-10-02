
type StatsCardProps = {
  title: string;
  count: number;
  isActive: boolean;
  onClick?: () => void;
};

export const StatsCard=(Stats:StatsCardProps) =>{
  return (
    <div className="card h-100 border-0 shadow-sm bg-danger" style={{maxWidth:"300px", width:"300px", minHeight:"100px"}}>
      <button
        className='btn w-100  text-start p-3 btn-orange text-white'
        onClick={Stats.onClick}
        style={{ borderRadius: '0.5rem' , minHeight:"100px"}}
      >
        <div className="fw-bold">{Stats.title}</div>
        <div className="fs-4">{Stats.count}</div>
      </button>
    </div>
  );
}
