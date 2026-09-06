import React from "react";

import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";

function PricingPage() {
  return (
    <>
      <Hero />
      <LeftSection
        imageURL="media/images/core.png"
        productName="Core"
        productDescription="
  C⌀re combines powerful trading tools, real-time market data, and a clean
  modern interface into one seamless platform. Fast, intuitive, and built for
  traders who somehow have 17 chart tabs open and still say “just one more
  analysis.”
"
        tryDemo=""
        learnMore=""
      />

      <RightSection
        imageURL="media/images/terminal.png"
        productName="Terminal"
        productDescription="
  The central dashboard for your Zero One account with detailed analytics,
  portfolio tracking, and investment insights in one clean interface. Monitor
  your trades, holdings, and overall performance with tools built for modern
  investors. Also helps you professionally analyze the stock you bought purely
  because the chart “looked bullish.”
"
        learnMore=""
      />

      <LeftSection
        imageURL="media/images/paisa.png"
        productName="Paisa"
        productDescription="
  Seamless direct mutual fund investing with zero commission and a modern
  investing experience. Because slow wealth creation through SIPs is still more
  realistic than becoming a crypto billionaire by Thursday.
"
        tryDemo=""
        learnMore=""
      />

      <RightSection
        imageURL="media/images/analysis.png"
        productName="Trade smarter, not emotionally"
        productDescription="
  Build your own trading journal directly from the holdings and P&L page with trade notes, strategies, and market insights. Track your performance over time and discover
  whether your trading style is actually data driven or just advanced levels of delusion with confidence and a candlestick chart.

"
        learnMore=""
      />

      <LeftSection
        imageURL="media/images/seekho.png"
        productName="Seekh⊚"
        productDescription="
  


  Seekho is Zero One’s modern learning platform built to simplify stock market
  education for the next generation of investors. From technical analysis and
  market fundamentals to trading psychology and risk management, concepts are
  explained through bite-sized lessons, clean visuals, and practical examples.
  The platform is designed for seamless learning across devices, so you can
  learn anytime, anywhere. Whether you’re a beginner learning what an IPO is or
  someone pretending to understand options Greeks on Twitter, Seekho makes
  finance feel far less intimidating and a lot more enjoyable.
"
        tryDemo=""
        learnMore=""
      />

      <Universe />
    </>
  );
}

export default PricingPage;
