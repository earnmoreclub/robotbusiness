"use client";

import { Box, ChevronLeft, ChevronRight, Cuboid, Radio } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Reveal } from "./reveal";
import { useLanguage } from "./language-provider";

export function SimulatorBlock() {
  const { language } = useLanguage(); const zh = language === "zh-Hant";
  const split = useMotionValue(50);
  const leftWidth = useTransform(split, value => `${value}%`);

  return (
    <section id="simulator" className="section-shell scroll-mt-20 py-24 sm:py-32" aria-labelledby="sim-title">
      <Reveal>
        <div className="section-heading text-center"><p className="kicker"><span>//</span> DIGITAL_TWIN_PIPELINE</p><h2 id="sim-title" className="mx-auto">{zh ? "在 Gazebo 測試，部署至現實。" : "Test in Gazebo. Deploy to Reality."}</h2><p className="section-copy mx-auto">{zh ? "每台租用的機器人都附有預先校準的 URDF 檔案與模擬器環境。" : "Every leased robot comes with pre-calibrated URDF files and simulator environments."}</p></div>
        <div className="sim-compare mt-12">
          <div className="sim-side sim-real"><div className="sim-meta right"><Radio /> {zh ? "實體硬體" : "PHYSICAL HARDWARE"}</div><img className="sim-image" src="/images/agilex-scout-mini.webp" alt={zh ? "實體自主移動機器人平台" : "Physical autonomous mobile robot platform"}/></div>
          <motion.div className="sim-side sim-digital" style={{ width: leftWidth }}><div className="sim-meta"><Cuboid /> {zh ? "數位孿生 · GAZEBO/RVIZ" : "DIGITAL TWIN · GAZEBO/RVIZ"}</div><img className="sim-image" src="/images/big-rocket-digital-twin.webp" alt={zh ? "自主移動機器人的數位孿生模擬" : "Autonomous mobile robot digital twin simulation"}/></motion.div>
          <motion.button
            type="button"
            aria-label={zh ? "拖曳比較數位孿生與實體硬體" : "Drag to compare digital twin and physical hardware"}
            className="sim-handle"
            drag="x"
            dragConstraints={{ left: -180, right: 180 }}
            dragElastic={0}
            dragMomentum={false}
            onDrag={(_, info) => split.set(Math.max(16, Math.min(84, 50 + info.offset.x / 5)))}
          >
            <ChevronLeft /><ChevronRight />
          </motion.button>
          <div className="sim-status"><Box /> urdf_checksum: <b>{zh ? "相符" : "matched"}</b><span /> calibration: <b>{zh ? "已同步" : "synced"}</b></div>
        </div>
      </Reveal>
    </section>
  );
}