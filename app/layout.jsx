import localFont from "next/font/local";
import "./globals.scss";
const body=localFont({src:"./fonts/Manrope.woff2",variable:"--font-body",display:"swap",weight:"200 800"});
const display=localFont({src:"./fonts/Cormorant.woff2",variable:"--font-display",display:"swap",weight:"300 700",preload:false});
export const metadata={metadataBase:new URL("https://ember-coffee-landing.pages.dev"),title:"EMBER — кофе с характером",description:"Авторский концепт спешелти-обжарки. Найди свой вкус, изучи коллекцию кофе и выбери рецепт для любимой чашки.",alternates:{canonical:"/"},robots:{index:false,follow:false},openGraph:{title:"EMBER — кофе с характером",description:"Маленький ритуал. Большой характер.",images:[{url:"/og.png",width:1200,height:630}],locale:"ru_RU",type:"website"},twitter:{card:"summary_large_image",images:["/og.png"]}};
export default function Layout({children}){return <html lang="ru" className={`${body.variable} ${display.variable}`}><body>{children}</body></html>;}
