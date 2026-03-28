export default function page() {
  return (
    <div>
      Test of horizontal scroll
      <div className="overflow-x-auto pb-4">
        <div className="flex w-max items-center gap-10">
          <div className="w-12 shrink-0" /> {/* Physical padding (Left) */}
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="aspect-video h-[300px] shrink-0 rounded-sm bg-neutral-100 shadow-sm"
            ></div>
          ))}
          <div className="w-12 shrink-0" /> {/* Physical padding (Right) */}
        </div>
      </div>
    </div>
  );
}
