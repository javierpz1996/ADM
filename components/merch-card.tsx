"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Shirt, Package } from "lucide-react";
import type { MerchItem } from "@/lib/mock-data";

interface MerchCardProps {
  item: MerchItem;
}

const imageIcons: Record<string, React.ReactNode> = {
  jersey: <Shirt className="h-16 w-16" />,
  hoodie: <Shirt className="h-16 w-16" />,
  tshirt: <Shirt className="h-16 w-16" />,
  mousepad: <Package className="h-16 w-16" />,
  cap: <Package className="h-16 w-16" />,
  pins: <Package className="h-16 w-16" />,
};

export function MerchCard({ item }: MerchCardProps) {
  return (
    <Card className="group relative bg-card/50 backdrop-blur-sm border-[#00D4FF]/20 hover:border-[#00D4FF]/60 transition-all duration-300 overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00D4FF]/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute -inset-px bg-gradient-to-r from-[#00D4FF]/0 via-[#00D4FF]/25 to-[#00D4FF]/0 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
      
      <CardContent className="relative p-6 flex flex-col h-full">
        {/* Category Badge */}
        <Badge 
          variant="outline" 
          className="absolute top-4 right-4 border-[#00D4FF]/40 text-[#00D4FF] bg-[#00D4FF]/10 text-xs"
        >
          {item.category}
        </Badge>

        {/* Product Image Placeholder */}
        <div className="flex items-center justify-center h-40 mb-6 rounded-lg bg-gradient-to-br from-[#00D4FF]/10 to-[#2563EB]/10 border border-[#00D4FF]/20 group-hover:border-[#00D4FF]/45 transition-colors">
          <div className="text-[#00D4FF]/60 group-hover:text-[#00D4FF] group-hover:scale-110 transition-all duration-300">
            {imageIcons[item.image] || <Package className="h-16 w-16" />}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col">
          <h3 className="font-bold text-foreground text-lg mb-2 group-hover:text-[#00D4FF] transition-colors">
            {item.name}
          </h3>
          
          {/* Price */}
          <div className="mt-auto">
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-2xl font-bold text-[#00D4FF]">
                ${item.price.toFixed(2)}
              </span>
              <span className="text-xs text-muted-foreground">USD</span>
            </div>

            {/* Buy Button */}
            <Button 
              className="w-full bg-[#00D4FF]/15 hover:bg-[#00D4FF] text-[#00D4FF] hover:text-slate-950 border border-[#00D4FF]/50 hover:border-[#00D4FF] shadow-lg shadow-[#00D4FF]/0 hover:shadow-[#00D4FF]/25 transition-all duration-300"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Buy Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
