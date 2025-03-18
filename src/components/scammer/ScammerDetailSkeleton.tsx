
import { Header } from "@/components/Header";

export function ScammerDetailSkeleton() {
  return (
    <div className="min-h-screen old-paper">
      <Header />
      <div className="container mx-auto max-w-6xl px-4 pt-32 pb-16">
        <div className="animate-pulse max-w-3xl mx-auto paper-texture rounded-sm border-2 border-western-wood p-6">
          <div className="h-8 bg-western-wood/20 rounded-md w-1/3 mb-2"></div>
          <div className="h-4 bg-western-wood/20 rounded-md w-1/2 mb-8"></div>
          <div className="aspect-[16/9] bg-western-wood/20 rounded-lg mb-6"></div>
          <div className="h-6 bg-western-wood/20 rounded-md w-1/4 mb-4"></div>
          <div className="h-4 bg-western-wood/20 rounded-md w-full mb-2"></div>
          <div className="h-4 bg-western-wood/20 rounded-md w-3/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div className="h-6 bg-western-wood/20 rounded-md w-1/4 mb-2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-western-wood/20 rounded-md w-full"></div>
                <div className="h-4 bg-western-wood/20 rounded-md w-3/4"></div>
              </div>
            </div>
            <div>
              <div className="h-[300px] bg-western-wood/20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
