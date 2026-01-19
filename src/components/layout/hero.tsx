import {
  RiArrowRightLine,
  RiFireLine,
  RiLeafLine,
  RiSeedlingLine,
} from "@remixicon/react";

export function Hero() {
  return (
    <div className="py-12 bg-background border-b border-border">
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-7xl mx-auto px-6">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="space-y-3">
            <span className="inline-block px-3 py-1 rounded-md bg-secondary text-secondary-foreground font-semibold text-xs tracking-wide">
              NEW ARRIVAL
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Premium Organic Salsa
            </h1>
            <p className="text-base text-muted-foreground max-w-lg mx-auto md:mx-0 leading-relaxed">
              Authentic Rwandan heritage. Handcrafted, 100% organic, pure
              flavor.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-md font-semibold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2">
              Find recipes <RiArrowRightLine size={16} />
            </button>
          </div>

          <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
            <Badge
              icon={<RiFireLine size={14} className="text-destructive" />}
              text="Spicy"
            />
            <Badge
              icon={<RiSeedlingLine size={14} className="text-green-600" />}
              text="Gluten-free"
            />
            <Badge
              icon={<RiLeafLine size={14} className="text-green-500" />}
              text="Vegan"
            />
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="w-80 bg-foregorund rounded-lg border border-border overflow-hidden">
            <div className="h-48 bg-secondary/30 flex items-center justify-center">
              <span className="text-8xl">🍅</span>
            </div>
            <div className="p-5 bg-card">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-foreground">
                  Premium Salsa
                </h3>
                <div className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                  400g
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="p-2 rounded bg-secondary/50">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">
                    Cal
                  </p>
                  <p className="text-sm font-bold">35</p>
                </div>
                <div className="p-2 rounded bg-secondary/50">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">
                    Fat
                  </p>
                  <p className="text-sm font-bold">0g</p>
                </div>
                <div className="p-2 rounded bg-secondary/50">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">
                    Pro
                  </p>
                  <p className="text-sm font-bold">3g</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
      {icon}
      <span>{text}</span>
    </div>
  );
}
