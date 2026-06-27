import { useState, useEffect, useRef } from "react";

// ── CSS ANIMATIONS ────────────────────────────────────────────────────────────
const ANIM_STYLE = `
@keyframes pressDown { 0%,100%{transform:translateY(0) scaleY(1)} 50%{transform:translateY(18px) scaleY(0.92)} }
@keyframes pressUp   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
@keyframes chinUp    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-22px)} }
@keyframes flyOpen   { 0%,100%{transform:rotate(-30deg)} 50%{transform:rotate(30deg)} }
@keyframes shoulderP { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
@keyframes sideRaise { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(60deg)} }
@keyframes legPress  { 0%,100%{transform:rotate(40deg)} 50%{transform:rotate(80deg)} }
@keyframes legCurl   { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-60deg)} }
@keyframes triExt    { 0%,100%{transform:rotate(-90deg)} 50%{transform:rotate(0deg)} }
@keyframes bicCurl   { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-100deg)} }
@keyframes crunch    { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-20deg)} }
@keyframes plankHold { 0%,100%{opacity:1} 50%{opacity:0.5} }
@keyframes rowPull   { 0%,100%{transform:translateX(0)} 50%{transform:translateX(-16px)} }
@keyframes pushDown  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(16px)} }
@keyframes squat     { 0%,100%{transform:translateY(0) scaleY(1)} 50%{transform:translateY(14px) scaleY(0.88)} }
@keyframes sidePlank { 0%,100%{opacity:1;transform:rotate(0deg)} 50%{opacity:0.6;transform:rotate(3deg)} }
@keyframes rearDelt  { 0%,100%{transform:rotate(20deg)} 50%{transform:rotate(-20deg)} }
`;

// ── EXERCISE ANIMATIONS (SVG stick figures) ───────────────────────────────────
const ExerciseAnim = ({ name, accent }) => {
  const s = { width: 110, height: 100, display: "block", margin: "0 auto" };
  const body = accent || "#3b82f6";
  const bar = "#94a3b8";

  const anims = {
    "Incline Chest Press": (
      <svg style={s} viewBox="0 0 110 100">
        {/* bench */}
        <rect x="10" y="68" width="90" height="8" rx="3" fill="#334155"/>
        {/* bar */}
        <rect x="15" y="28" width="80" height="5" rx="2" fill={bar}/>
        <circle cx="15" cy="30" r="6" fill={bar}/>
        <circle cx="95" cy="30" r="6" fill={bar}/>
        {/* body lying */}
        <rect x="25" y="56" width="60" height="12" rx="6" fill={body} opacity="0.3"/>
        {/* head */}
        <circle cx="85" cy="58" r="8" fill={body}/>
        {/* arms animated */}
        <g style={{animation:"pressUp 1.8s ease-in-out infinite"}}>
          <line x1="35" y1="60" x2="25" y2="40" stroke={body} strokeWidth="4" strokeLinecap="round"/>
          <line x1="25" y1="40" x2="22" y2="30" stroke={body} strokeWidth="4" strokeLinecap="round"/>
          <line x1="75" y1="60" x2="85" y2="40" stroke={body} strokeWidth="4" strokeLinecap="round"/>
          <line x1="85" y1="40" x2="88" y2="30" stroke={body} strokeWidth="4" strokeLinecap="round"/>
        </g>
        <text x="55" y="95" textAnchor="middle" fill="#64748b" fontSize="9">Incline Press</text>
      </svg>
    ),
    "Flat Chest Press": (
      <svg style={s} viewBox="0 0 110 100">
        <rect x="10" y="62" width="90" height="8" rx="3" fill="#334155"/>
        <rect x="15" y="28" width="80" height="5" rx="2" fill={bar}/>
        <circle cx="15" cy="30" r="6" fill={bar}/><circle cx="95" cy="30" r="6" fill={bar}/>
        <rect x="25" y="52" width="60" height="12" rx="6" fill={body} opacity="0.3"/>
        <circle cx="83" cy="54" r="8" fill={body}/>
        <g style={{animation:"pressUp 1.8s ease-in-out infinite"}}>
          <line x1="38" y1="56" x2="25" y2="40" stroke={body} strokeWidth="4" strokeLinecap="round"/>
          <line x1="25" y1="40" x2="22" y2="30" stroke={body} strokeWidth="4" strokeLinecap="round"/>
          <line x1="72" y1="56" x2="85" y2="40" stroke={body} strokeWidth="4" strokeLinecap="round"/>
          <line x1="85" y1="40" x2="88" y2="30" stroke={body} strokeWidth="4" strokeLinecap="round"/>
        </g>
        <text x="55" y="95" textAnchor="middle" fill="#64748b" fontSize="9">Flat Press</text>
      </svg>
    ),
    "Assisted Chin-Up": (
      <svg style={s} viewBox="0 0 110 100">
        <rect x="20" y="8" width="70" height="6" rx="3" fill={bar}/>
        <g style={{animation:"chinUp 2s ease-in-out infinite"}}>
          <circle cx="55" cy="35" r="9" fill={body}/>
          <line x1="55" y1="44" x2="55" y2="68" stroke={body} strokeWidth="4" strokeLinecap="round"/>
          <line x1="55" y1="50" x2="42" y2="62" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="55" y1="50" x2="68" y2="62" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="55" y1="68" x2="46" y2="82" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="55" y1="68" x2="64" y2="82" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="42" y1="20" x2="38" y2="11" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="68" y1="20" x2="72" y2="11" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
        </g>
        <text x="55" y="97" textAnchor="middle" fill="#64748b" fontSize="9">Chin-Up</text>
      </svg>
    ),
    "Chest Fly": (
      <svg style={s} viewBox="0 0 110 100">
        <rect x="10" y="58" width="90" height="8" rx="3" fill="#334155"/>
        <rect x="25" y="48" width="60" height="12" rx="6" fill={body} opacity="0.3"/>
        <circle cx="83" cy="50" r="8" fill={body}/>
        <g style={{animation:"flyOpen 2s ease-in-out infinite", transformOrigin:"55px 52px"}}>
          <line x1="38" y1="52" x2="18" y2="42" stroke={body} strokeWidth="4" strokeLinecap="round"/>
          <circle cx="16" cy="41" r="4" fill={body} opacity="0.7"/>
          <line x1="72" y1="52" x2="92" y2="42" stroke={body} strokeWidth="4" strokeLinecap="round"/>
          <circle cx="94" cy="41" r="4" fill={body} opacity="0.7"/>
        </g>
        <text x="55" y="92" textAnchor="middle" fill="#64748b" fontSize="9">Chest Fly</text>
      </svg>
    ),
    "Shoulder Press": (
      <svg style={s} viewBox="0 0 110 100">
        {/* seated person */}
        <rect x="40" y="72" width="30" height="8" rx="3" fill="#334155"/>
        <circle cx="55" cy="38" r="9" fill={body}/>
        <line x1="55" y1="47" x2="55" y2="68" stroke={body} strokeWidth="4" strokeLinecap="round"/>
        <line x1="55" y1="68" x2="44" y2="80" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="55" y1="68" x2="66" y2="80" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
        <g style={{animation:"shoulderP 1.8s ease-in-out infinite"}}>
          <line x1="40" y1="52" x2="28" y2="46" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="28" y1="46" x2="26" y2="34" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="70" y1="52" x2="82" y2="46" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="82" y1="46" x2="84" y2="34" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <rect x="22" y="28" width="66" height="5" rx="2" fill={bar}/>
          <circle cx="22" cy="30" r="5" fill={bar}/><circle cx="88" cy="30" r="5" fill={bar}/>
        </g>
        <text x="55" y="96" textAnchor="middle" fill="#64748b" fontSize="9">Shoulder Press</text>
      </svg>
    ),
    "Seated Side Raises": (
      <svg style={s} viewBox="0 0 110 100">
        <rect x="38" y="70" width="34" height="8" rx="3" fill="#334155"/>
        <circle cx="55" cy="38" r="9" fill={body}/>
        <line x1="55" y1="47" x2="55" y2="70" stroke={body} strokeWidth="4" strokeLinecap="round"/>
        <line x1="55" y1="70" x2="44" y2="80" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="55" y1="70" x2="66" y2="80" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
        <g style={{animation:"sideRaise 2s ease-in-out infinite", transformOrigin:"40px 54px"}}>
          <line x1="40" y1="54" x2="22" y2="50" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <circle cx="20" cy="50" r="4" fill={body} opacity="0.8"/>
        </g>
        <g style={{animation:"sideRaise 2s ease-in-out infinite 1s", transformOrigin:"70px 54px", transform:"scaleX(-1) translateX(-110px)"}}>
          <line x1="70" y1="54" x2="88" y2="50" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <circle cx="90" cy="50" r="4" fill={body} opacity="0.8"/>
        </g>
        <text x="55" y="96" textAnchor="middle" fill="#64748b" fontSize="9">Side Raises</text>
      </svg>
    ),
    "Leg Press": (
      <svg style={s} viewBox="0 0 110 100">
        <rect x="5" y="30" width="50" height="50" rx="5" fill="#1e293b" stroke="#334155" strokeWidth="1.5"/>
        <circle cx="38" cy="48" r="8" fill={body}/>
        <line x1="38" y1="56" x2="38" y2="68" stroke={body} strokeWidth="4" strokeLinecap="round"/>
        <g style={{animation:"legPress 2s ease-in-out infinite", transformOrigin:"38px 68px"}}>
          <line x1="38" y1="68" x2="55" y2="78" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="55" y1="78" x2="68" y2="72" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="38" y1="68" x2="55" y2="80" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
        </g>
        <rect x="60" y="55" width="45" height="20" rx="4" fill="#334155"/>
        <text x="55" y="97" textAnchor="middle" fill="#64748b" fontSize="9">Leg Press</text>
      </svg>
    ),
    "Leg Curl": (
      <svg style={s} viewBox="0 0 110 100">
        <rect x="10" y="45" width="90" height="12" rx="4" fill="#334155"/>
        <circle cx="30" cy="40" r="8" fill={body}/>
        <line x1="30" y1="48" x2="55" y2="55" stroke={body} strokeWidth="4" strokeLinecap="round"/>
        <g style={{animation:"legCurl 1.8s ease-in-out infinite", transformOrigin:"55px 55px"}}>
          <line x1="55" y1="55" x2="75" y2="55" stroke={body} strokeWidth="4" strokeLinecap="round"/>
          <line x1="75" y1="55" x2="88" y2="42" stroke={body} strokeWidth="4" strokeLinecap="round"/>
        </g>
        <text x="55" y="92" textAnchor="middle" fill="#64748b" fontSize="9">Leg Curl</text>
      </svg>
    ),
    "Triceps Extension": (
      <svg style={s} viewBox="0 0 110 100">
        <rect x="38" y="70" width="34" height="8" rx="3" fill="#334155"/>
        <circle cx="55" cy="32" r="9" fill={body}/>
        <line x1="55" y1="41" x2="55" y2="65" stroke={body} strokeWidth="4" strokeLinecap="round"/>
        <line x1="55" y1="65" x2="44" y2="78" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="55" y1="65" x2="66" y2="78" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
        <g style={{animation:"triExt 1.8s ease-in-out infinite", transformOrigin:"55px 46px"}}>
          <line x1="44" y1="46" x2="66" y2="46" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="44" y1="46" x2="40" y2="62" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="66" y1="46" x2="70" y2="62" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
        </g>
        <text x="55" y="94" textAnchor="middle" fill="#64748b" fontSize="9">Triceps Ext.</text>
      </svg>
    ),
    "Incline Biceps Curl": (
      <svg style={s} viewBox="0 0 110 100">
        <rect x="20" y="52" width="70" height="30" rx="5" fill="#1e293b" stroke="#334155" strokeWidth="1.5" transform="rotate(-20,55,67)"/>
        <circle cx="42" cy="36" r="9" fill={body}/>
        <line x1="42" y1="45" x2="50" y2="64" stroke={body} strokeWidth="4" strokeLinecap="round"/>
        <g style={{animation:"bicCurl 1.8s ease-in-out infinite", transformOrigin:"50px 64px"}}>
          <line x1="50" y1="64" x2="62" y2="74" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <circle cx="64" cy="76" r="4" fill={body} opacity="0.8"/>
        </g>
        <text x="55" y="97" textAnchor="middle" fill="#64748b" fontSize="9">Incline Curl</text>
      </svg>
    ),
    "Abs Crunch": (
      <svg style={s} viewBox="0 0 110 100">
        <rect x="15" y="72" width="80" height="8" rx="3" fill="#334155"/>
        <g style={{animation:"crunch 1.8s ease-in-out infinite", transformOrigin:"55px 68px"}}>
          <line x1="30" y1="68" x2="80" y2="68" stroke={body} strokeWidth="4" strokeLinecap="round"/>
          <line x1="30" y1="68" x2="28" y2="80" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="80" y1="68" x2="82" y2="80" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="55" y1="68" x2="55" y2="52" stroke={body} strokeWidth="4" strokeLinecap="round"/>
          <circle cx="55" cy="44" r="9" fill={body}/>
          <line x1="46" y1="52" x2="38" y2="46" stroke={body} strokeWidth="3" strokeLinecap="round"/>
          <line x1="64" y1="52" x2="72" y2="46" stroke={body} strokeWidth="3" strokeLinecap="round"/>
        </g>
        <text x="55" y="94" textAnchor="middle" fill="#64748b" fontSize="9">Abs Crunch</text>
      </svg>
    ),
    "Ab Crunch": (
      <svg style={s} viewBox="0 0 110 100">
        <rect x="15" y="72" width="80" height="8" rx="3" fill="#334155"/>
        <g style={{animation:"crunch 1.8s ease-in-out infinite", transformOrigin:"55px 68px"}}>
          <line x1="30" y1="68" x2="80" y2="68" stroke={body} strokeWidth="4" strokeLinecap="round"/>
          <line x1="30" y1="68" x2="28" y2="80" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="80" y1="68" x2="82" y2="80" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="55" y1="68" x2="55" y2="52" stroke={body} strokeWidth="4" strokeLinecap="round"/>
          <circle cx="55" cy="44" r="9" fill={body}/>
          <line x1="46" y1="52" x2="38" y2="46" stroke={body} strokeWidth="3" strokeLinecap="round"/>
          <line x1="64" y1="52" x2="72" y2="46" stroke={body} strokeWidth="3" strokeLinecap="round"/>
        </g>
        <text x="55" y="94" textAnchor="middle" fill="#64748b" fontSize="9">Ab Crunch</text>
      </svg>
    ),
    "Plank": (
      <svg style={s} viewBox="0 0 110 100">
        <rect x="10" y="72" width="90" height="6" rx="2" fill="#334155"/>
        <g style={{animation:"plankHold 2s ease-in-out infinite"}}>
          <line x1="20" y1="68" x2="90" y2="68" stroke={body} strokeWidth="5" strokeLinecap="round"/>
          <circle cx="92" cy="62" r="9" fill={body}/>
          <line x1="20" y1="68" x2="18" y2="72" stroke={body} strokeWidth="4" strokeLinecap="round"/>
          <line x1="35" y1="68" x2="33" y2="72" stroke={body} strokeWidth="4" strokeLinecap="round"/>
          <line x1="80" y1="55" x2="78" y2="68" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="70" y1="55" x2="68" y2="68" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
        </g>
        <text x="55" y="92" textAnchor="middle" fill="#64748b" fontSize="9">Plank — ثبات</text>
      </svg>
    ),
    "Side Plank": (
      <svg style={s} viewBox="0 0 110 100">
        <rect x="10" y="78" width="90" height="6" rx="2" fill="#334155"/>
        <g style={{animation:"sidePlank 2s ease-in-out infinite"}}>
          <line x1="18" y1="74" x2="85" y2="55" stroke={body} strokeWidth="5" strokeLinecap="round"/>
          <circle cx="90" cy="48" r="9" fill={body}/>
          <line x1="18" y1="74" x2="16" y2="78" stroke={body} strokeWidth="4" strokeLinecap="round"/>
          <line x1="52" y1="64" x2="60" y2="52" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="52" y1="64" x2="45" y2="74" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
        </g>
        <text x="55" y="94" textAnchor="middle" fill="#64748b" fontSize="9">Side Plank</text>
      </svg>
    ),
    "T Bar Row": (
      <svg style={s} viewBox="0 0 110 100">
        <rect x="30" y="50" width="50" height="20" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1.5" transform="rotate(-10,55,60)"/>
        <circle cx="38" cy="36" r="9" fill={body}/>
        <line x1="38" y1="45" x2="44" y2="60" stroke={body} strokeWidth="4" strokeLinecap="round"/>
        <line x1="44" y1="60" x2="36" y2="72" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="44" y1="60" x2="52" y2="72" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
        <g style={{animation:"rowPull 1.8s ease-in-out infinite"}}>
          <line x1="44" y1="52" x2="62" y2="48" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="62" y1="48" x2="75" y2="52" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <circle cx="77" cy="53" r="4" fill={body} opacity="0.8"/>
        </g>
        <text x="55" y="94" textAnchor="middle" fill="#64748b" fontSize="9">T-Bar Row</text>
      </svg>
    ),
    "Chest Supported Row": (
      <svg style={s} viewBox="0 0 110 100">
        <rect x="25" y="42" width="60" height="25" rx="5" fill="#1e293b" stroke="#334155" strokeWidth="1.5" transform="rotate(-15,55,54)"/>
        <circle cx="35" cy="30" r="9" fill={body}/>
        <line x1="35" y1="39" x2="40" y2="54" stroke={body} strokeWidth="4" strokeLinecap="round"/>
        <g style={{animation:"rowPull 1.8s ease-in-out infinite"}}>
          <line x1="40" y1="50" x2="58" y2="46" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="40" y1="54" x2="58" y2="52" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <circle cx="60" cy="49" r="4" fill={body} opacity="0.8"/>
        </g>
        <line x1="40" y1="54" x2="36" y2="72" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
        <text x="55" y="94" textAnchor="middle" fill="#64748b" fontSize="9">Supported Row</text>
      </svg>
    ),
    "Cable Rear Delt Fly": (
      <svg style={s} viewBox="0 0 110 100">
        <circle cx="55" cy="38" r="9" fill={body}/>
        <line x1="55" y1="47" x2="55" y2="68" stroke={body} strokeWidth="4" strokeLinecap="round"/>
        <line x1="55" y1="68" x2="44" y2="80" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="55" y1="68" x2="66" y2="80" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
        <g style={{animation:"rearDelt 2s ease-in-out infinite", transformOrigin:"42px 52px"}}>
          <line x1="42" y1="52" x2="22" y2="44" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <circle cx="20" cy="43" r="4" fill={body} opacity="0.8"/>
        </g>
        <g style={{animation:"rearDelt 2s ease-in-out infinite 1s", transformOrigin:"68px 52px"}}>
          <line x1="68" y1="52" x2="88" y2="44" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <circle cx="90" cy="43" r="4" fill={body} opacity="0.8"/>
        </g>
        <text x="55" y="96" textAnchor="middle" fill="#64748b" fontSize="9">Rear Delt Fly</text>
      </svg>
    ),
    "Hack Squat": (
      <svg style={s} viewBox="0 0 110 100">
        <rect x="20" y="15" width="70" height="70" rx="5" fill="#1e293b" stroke="#334155" strokeWidth="1.5"/>
        <g style={{animation:"squat 2s ease-in-out infinite"}}>
          <circle cx="55" cy="34" r="9" fill={body}/>
          <line x1="55" y1="43" x2="55" y2="60" stroke={body} strokeWidth="4" strokeLinecap="round"/>
          <line x1="55" y1="60" x2="42" y2="76" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="42" y1="76" x2="40" y2="86" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="55" y1="60" x2="68" y2="76" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="68" y1="76" x2="70" y2="86" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
        </g>
        <text x="55" y="98" textAnchor="middle" fill="#64748b" fontSize="9">Hack Squat</text>
      </svg>
    ),
    "Triceps Push Down": (
      <svg style={s} viewBox="0 0 110 100">
        <rect x="48" y="8" width="14" height="30" rx="3" fill="#334155"/>
        <circle cx="55" cy="32" r="9" fill={body}/>
        <line x1="55" y1="41" x2="55" y2="60" stroke={body} strokeWidth="4" strokeLinecap="round"/>
        <line x1="55" y1="60" x2="44" y2="75" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="55" y1="60" x2="66" y2="75" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
        <g style={{animation:"pushDown 1.8s ease-in-out infinite", transformOrigin:"55px 48px"}}>
          <line x1="44" y1="48" x2="40" y2="38" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="40" y1="38" x2="55" y2="30" stroke={body} strokeWidth="3" strokeLinecap="round"/>
          <line x1="66" y1="48" x2="70" y2="38" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="70" y1="38" x2="55" y2="30" stroke={body} strokeWidth="3" strokeLinecap="round"/>
        </g>
        <text x="55" y="96" textAnchor="middle" fill="#64748b" fontSize="9">Triceps Pushdown</text>
      </svg>
    ),
    "Alternating Curl": (
      <svg style={s} viewBox="0 0 110 100">
        <rect x="38" y="70" width="34" height="8" rx="3" fill="#334155"/>
        <circle cx="55" cy="36" r="9" fill={body}/>
        <line x1="55" y1="45" x2="55" y2="68" stroke={body} strokeWidth="4" strokeLinecap="round"/>
        <line x1="55" y1="68" x2="44" y2="78" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="55" y1="68" x2="66" y2="78" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
        <g style={{animation:"bicCurl 1.8s ease-in-out infinite", transformOrigin:"42px 54px"}}>
          <line x1="42" y1="54" x2="36" y2="62" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <circle cx="34" cy="64" r="4" fill={body} opacity="0.8"/>
        </g>
        <g style={{animation:"bicCurl 1.8s ease-in-out infinite 0.9s", transformOrigin:"68px 54px"}}>
          <line x1="68" y1="54" x2="74" y2="62" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
          <circle cx="76" cy="64" r="4" fill={body} opacity="0.8"/>
        </g>
        <text x="55" y="96" textAnchor="middle" fill="#64748b" fontSize="9">Alt. Curl</text>
      </svg>
    ),
  };

  return anims[name] || (
    <svg style={s} viewBox="0 0 110 100">
      <circle cx="55" cy="35" r="9" fill={body}/>
      <line x1="55" y1="44" x2="55" y2="68" stroke={body} strokeWidth="4" strokeLinecap="round"/>
      <line x1="55" y1="52" x2="42" y2="62" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="55" y1="52" x2="68" y2="62" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="55" y1="68" x2="46" y2="82" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="55" y1="68" x2="64" y2="82" stroke={body} strokeWidth="3.5" strokeLinecap="round"/>
      <text x="55" y="97" textAnchor="middle" fill="#64748b" fontSize="8">{name.slice(0,14)}</text>
    </svg>
  );
};

// ── DATA ──────────────────────────────────────────────────────────────────────
const PROFILE = { name:"أحمد", weight:87.0, muscle:62.6, fat:20.8, visceralFat:11 };

const WORKOUTS = {
  "Upper 1": [
    { name:"Incline Chest Press", type:"reps", unit:"lb", startWeight:55,
      presets:[{w:55,r:12},{w:66,r:8}],
      muscles:"🎯 رئيسي: صدر علوي (Upper Pec)\n⚡ مساعد: كتف أمامي + ترايسبس",
      safety:"ضهرك ملصوق بالكرسي طول الوقت — لو ارتفع معناه الوزن تقيل",
      tips:["ضهرك ملصوق بالكرسي طول الوقت","نزّل ببطء 3 ثواني، ارفع بقوة","مرفقيك مش فارد 100% فوق","زاوية 30-45° — مش 90°"],
      cue:"📐 زاوية 45° — صدر علوي",
      video:"https://www.tiktok.com/search?q=شرح+تمرين+صدر+علوي+جهاز+incline+chest+press" },
    { name:"Assisted Chin-Up", type:"reps", unit:"lb", startWeight:47,
      presets:[{w:47,r:10},{w:40,r:10}],
      muscles:"🎯 رئيسي: ظهر عريض (Lats) + بايسبس\n⚡ مساعد: ظهر علوي + ساعد",
      safety:"متأرجحش — الحركة من الكتف مش من الوسط",
      tips:["الوزن المساعد أكتر = أسهل","اسحب لحد ما ذقنك فوق البار","نزّل ببطء — ده الجزء المهم","كتفيك لأسفل وللخلف قبل ما تبدأ"],
      cue:"⬆️ ظهر وبايسبس",
      video:"https://www.tiktok.com/search?q=شرح+تمرين+عقلة+مساعدة+chin+up" },
    { name:"Chest Fly", type:"reps", unit:"lb", startWeight:77,
      presets:[{w:77,r:10},{w:99,r:12}],
      muscles:"🎯 رئيسي: صدر كامل (Pectoralis Major)\n⚡ مساعد: كتف أمامي بسيط",
      safety:"مرفقيك منحنيين دايماً — لو فردتهم كامل هتأذي كوعك",
      tips:["مرفقيك منحنيين بسيط طول الوقت","افتح زي بتعانق شجرة كبيرة","أقفل ببطء — مش بتدفع","حس بالشد في منتصف الصدر"],
      cue:"🦋 فراشة — عزل الصدر",
      video:"https://www.tiktok.com/search?q=شرح+تمرين+فراشة+الصدر+chest+fly+جهاز" },
    { name:"Shoulder Press", type:"reps", unit:"lb", startWeight:15,
      presets:[{w:17.5,r:12},{w:20,r:10}],
      muscles:"🎯 رئيسي: كتف أمامي + كتف جانبي\n⚡ مساعد: ترايسبس",
      safety:"وزن مأمن مهم جداً — مفصل الكتف بتاعك محتاج حماية",
      tips:["وزن مأمن لحماية مفصل الكتف","مش لازم ترفع أثقل هنا","ركّز على الحركة الكاملة","شد بطنك طول الوقت"],
      cue:"🔒 أكتاف — حماية المفصل أولى",
      video:"https://www.tiktok.com/search?q=شرح+تمرين+ضغط+كتف+جهاز+shoulder+press" },
    { name:"Seated Side Raises", type:"reps", unit:"kg", startWeight:7.5,
      presets:[{w:7.5,r:12},{w:10,r:10}],
      muscles:"🎯 رئيسي: كتف جانبي (Lateral Delt)\n⚡ بيعطي عرض الكتف",
      safety:"متحركش جسمك — لو بتأرجح يبقى الوزن تقيل",
      tips:["ارفع للجانب مش للأمام","الكوع يسبق الرسغ قليلاً","وقف ثانية فوق قبل ما تنزل","نزّل ببطء — مش بترمي"],
      cue:"↔️ جانبي — عرض الكتف",
      video:"https://www.tiktok.com/search?q=شرح+تمرين+رفرفة+جانبية+كتف+lateral+raise" },
  ],
  "Lower 1": [
    { name:"Leg Press", type:"reps", unit:"kg", startWeight:40,
      presets:[{w:40,r:10},{w:60,r:12}],
      muscles:"🎯 رئيسي: كوادريسبس (Quads)\n⚡ مساعد: غلوت + هامسترينج",
      safety:"متقفلش ركبتك فوق — وخليها مش بتتعدى الصابع",
      tips:["رجليك متاعدين على العرض","انزل لـ 90 درجة بس","متقفلش ركبتك فوق","ضهرك ملصوق بالكرسي"],
      cue:"🦵 ضغط أرجل — كوادريسبس",
      video:"https://www.tiktok.com/search?q=شرح+تمرين+ضغط+أرجل+leg+press+جهاز" },
    { name:"Seated Leg Curl", type:"reps", unit:"lb", startWeight:55,
      presets:[{w:55,r:12},{w:55,r:12}],
      muscles:"🎯 رئيسي: هامسترينج (Hamstrings)\n⚡ مساعد: غلوت",
      safety:"متزنكش على الجهاز — ده بيشيل الحمل من العضلة",
      tips:["ببطء في الرجوع — ده الجزء المهم","متزنكش على الجهاز","ركّز على الشد في الفخدة الخلفية","شايل ثانية فوق"],
      cue:"🔄 هامسترينج",
      video:"https://www.tiktok.com/search?q=شرح+تمرين+leg+curl+هامسترينج+جهاز" },
    { name:"Triceps Press", type:"reps", unit:"lb", startWeight:13.7,
      presets:[{w:13.7,r:10},{w:16.2,r:10}],
      muscles:"🎯 رئيسي: ترايسبس (Triceps) — الرأس الطويل\n⚡ مساعد: كتف خلفي",
      safety:"كوعيك ثابتين — لو تحركوا يبقى الوزن تقيل",
      tips:["كوعيك ثابتين جنب راسك","افرد الدراع كاملة","نزّل ببطء خلف راسك","مش بتلف رسغك"],
      cue:"💪 تمديد ترايسبس",
      video:"https://www.tiktok.com/search?q=شرح+تمرين+triceps+extension+ترايسبس" },
    { name:"Incline Biceps Curl", type:"reps", unit:"kg", startWeight:7.5,
      presets:[{w:7.5,r:10},{w:10,r:12}],
      muscles:"🎯 رئيسي: بايسبس (Biceps) — الرأسين\n⚡ مساعد: ساعد",
      safety:"متتحركش عن الدكة — المرجحة بتضيع التمرين",
      tips:["الضهر مستوي على الدكة المائلة","مش مسموح مرجحة","ركّز على الشد في البايسبس","نزّل ببطء كامل"],
      cue:"💪 بايسبس — أقوى عزل",
      video:"https://www.tiktok.com/search?q=شرح+تمرين+بايسبس+دكة+incline+curl" },
    { name:"Abs Crunch", type:"reps", unit:null, startWeight:null,
      presets:[{r:12},{r:15}],
      muscles:"🎯 رئيسي: بطن علوي (Rectus Abdominis)\n⚡ مساعد: هيب فليكسور",
      safety:"مش بترفع جسمك كله — الحركة من الأكتاف بس",
      tips:["مش بترفع جسمك كله — بس الأكتاف","زفير وانت بتطلع","شايل ثانية فوق","إيديك على صدرك مش خلف دماغك"],
      cue:"🎯 بطن علوي",
      video:"https://www.tiktok.com/search?q=شرح+تمرين+بطن+كرنش+abs+crunch" },
    { name:"Plank", type:"time", unit:null, startWeight:null,
      presets:[{target:"40s"},{target:"40s"}],
      muscles:"🎯 رئيسي: كور كامل (Core)\n⚡ مساعد: ظهر + أكتاف + غلوت",
      safety:"متوقفش لو احست بألم في الضهر السفلي — ارفع مؤخرتك شوية",
      tips:["جسمك خط مستقيم من راسك لكعبك","بطنك جوّا طول الوقت","تنفس عادي — مش بتحبس","مش بترفع مؤخرتك للأعلى"],
      cue:"⏱ هدف: 40 ← 60 ثانية",
      video:"https://www.tiktok.com/search?q=شرح+تمرين+بلانك+plank+كور" },
  ],
  "Upper 2": [
    { name:"Flat Chest Press", type:"reps", unit:"lb", startWeight:35,
      presets:[{w:35,r:12},{w:45,r:8}],
      muscles:"🎯 رئيسي: صدر وسط (Pec Major)\n⚡ مساعد: ترايسبس + كتف أمامي",
      safety:"نزّل لحد ما الكوع 90° بس — مش أكتر عشان القطنية",
      tips:["تحكم في المدى الحركي","نزّل لحد ما الكوع 90°","مش بتحتاج تنزل أكتر","ضهرك ملصوق بالكرسي"],
      cue:"📏 بنش مستوي — صدر وسط",
      video:"https://www.tiktok.com/search?q=شرح+تمرين+صدر+جهاز+flat+chest+press" },
    { name:"Chest Fly", type:"reps", unit:"lb", startWeight:77,
      presets:[{w:77,r:12},{w:88,r:12}],
      muscles:"🎯 رئيسي: صدر كامل (Pectoralis Major)\n⚡ مساعد: كتف أمامي بسيط",
      safety:"مرفقيك منحنيين دايماً — أهم حاجة في التمرين ده",
      tips:["نفس تقنية Upper 1","ركّز على الشد في منتصف الصدر","مرفقيك منحنيين دايماً","مش بتدفع — بتضم"],
      cue:"🦋 فراشة — عزل الصدر",
      video:"https://www.tiktok.com/search?q=شرح+تمرين+فراشة+الصدر+chest+fly+جهاز" },
    { name:"T Bar Row", type:"reps", unit:"kg", startWeight:15,
      presets:[{w:15,r:10},{w:30,r:8}],
      muscles:"🎯 رئيسي: ظهر وسط + Rhomboids\n⚡ مساعد: بايسبس + ظهر علوي",
      safety:"صدرك على المسند طول الوقت — لو ارتفع يبقى الوزن تقيل",
      tips:["صدرك على المسند طول الوقت","اسحب للحزام — مش للذقن","عصر الظهر في الأعلى ثانية","نزّل ببطء — مش بترمي"],
      cue:"🏋️ سحب T — ظهر علوي",
      video:"https://www.tiktok.com/search?q=شرح+تمرين+T+bar+row+ظهر" },
    { name:"Chest Supported Row", type:"reps", unit:"lb", startWeight:35,
      presets:[{w:35,r:12},{w:45,r:8}],
      muscles:"🎯 رئيسي: ظهر وسط (Mid Back)\n⚡ مساعد: بايسبس + Rhomboids",
      safety:"صدرك على الدكة مش بترفعه — ده بيحمي القطنية",
      tips:["صدرك على الدكة مش بترفعه","مرفقيك بيجوا للخلف — مش للجانب","حس بالشد بين الكتفين","نزّل ببطء كامل"],
      cue:"🔙 سحب بمسند — ظهر وسط",
      video:"https://www.tiktok.com/search?q=شرح+تمرين+chest+supported+row+ظهر" },
    { name:"Seated Side Raises", type:"reps", unit:"kg", startWeight:7.5,
      presets:[{w:7.5,r:12},{w:10,r:12}],
      muscles:"🎯 رئيسي: كتف جانبي (Lateral Delt)\n⚡ بيعطي عرض الكتف",
      safety:"متأرجحش — الوزن مش مهم، الحركة الصح هي المهمة",
      tips:["نفس تقنية Upper 1","جالس — مش واقف","مش بتأرجح جسمك","الكوع فوق الرسغ دايماً"],
      cue:"↔️ جانبي — عرض الكتف",
      video:"https://www.tiktok.com/search?q=شرح+تمرين+رفرفة+جانبية+كتف+lateral+raise" },
    { name:"Cable Rear Delt Fly", type:"reps", unit:"lb", startWeight:12,
      presets:[{w:12,r:12},{w:22,r:12}],
      muscles:"🎯 رئيسي: كتف خلفي (Rear Delt)\n⚡ مساعد: ظهر علوي + Rhomboids",
      safety:"الوزن مش مهم هنا — الاستشعار بالعضلة هو الهدف",
      tips:["انحن للأمام قليلاً","دراعيك للجانب — مش للأسفل","ركّز على الكتف الخلفي","نزّل ببطء — مش بترمي"],
      cue:"🔀 كتف خلفي",
      video:"https://www.tiktok.com/search?q=شرح+تمرين+rear+delt+fly+كتف+خلفي" },
  ],
  "Lower 2": [
    { name:"Hack Squat", type:"reps", unit:"kg", startWeight:30,
      presets:[{w:30,r:12},{w:40,r:10}],
      muscles:"🎯 رئيسي: كوادريسبس + غلوت\n⚡ مساعد: هامسترينج",
      safety:"ظهرك ملصوق بالجهاز طول الوقت — لو انفصل وقف فوراً",
      tips:["ظهرك ملصوق بالجهاز طول الوقت","انزل لـ 90 درجة بالظبط","حماية القطنية — متفصلش","رجليك متاعدين على العرض"],
      cue:"🦵 هاك سكوات — كوادريسبس + غلوت",
      video:"https://www.tiktok.com/search?q=شرح+تمرين+hack+squat+هاك+سكوات" },
    { name:"Leg Curl", type:"reps", unit:"lb", startWeight:55,
      presets:[{w:55,r:12},{w:55,r:12}],
      muscles:"🎯 رئيسي: هامسترينج (Hamstrings)\n⚡ مساعد: غلوت",
      safety:"نفس تقنية Lower 1 — التحكم أهم من الوزن",
      tips:["نفس تقنية Lower 1","تحكم في الحركة للأسفل","شايل ثانية فوق","مش بتأرجح وركك"],
      cue:"🔄 هامسترينج",
      video:"https://www.tiktok.com/search?q=شرح+تمرين+leg+curl+هامسترينج+جهاز" },
    { name:"Triceps Pushdown", type:"reps", unit:"lb", startWeight:20,
      presets:[{w:20,r:12},{w:22,r:10}],
      muscles:"🎯 رئيسي: ترايسبس (Triceps) — 3 رؤوس\n⚡ مساعد: ساعد",
      safety:"كوعيك ثابتين جنب جسمك — لو تحركوا يبقى الوزن تقيل",
      tips:["كوعيك ثابتين جنب جسمك","افرد الدراع كاملة للأسفل","مش بتحرك كتفيك","شايل ثانية في الأسفل"],
      cue:"⬇️ ترايسبس كابل",
      video:"https://www.tiktok.com/search?q=شرح+تمرين+triceps+pushdown+ترايسبس+كابل" },
    { name:"Alternating Curl (Preacher)", type:"reps", unit:"kg", startWeight:7.5,
      presets:[{w:7.5,r:12},{w:10,r:10}],
      muscles:"🎯 رئيسي: بايسبس (Biceps) — الرأسين\n⚡ مساعد: ساعد + براكياليس",
      safety:"بدون مرجحة — لو بتأرجح الوزن تقيل",
      tips:["بدون مرجحة — ده أهم حاجة","كل دراع لوحدها","دوّر رسغك وانت بتطلع","نزّل ببطء كامل"],
      cue:"💪 بايسبس متناوب",
      video:"https://www.tiktok.com/search?q=شرح+تمرين+بايسبس+دكة+incline+curl" },
    { name:"Side Plank", type:"time", unit:null, startWeight:null,
      presets:[{target:"30s"},{target:"30s"}],
      muscles:"🎯 رئيسي: كور جانبي (Obliques)\n⚡ مساعد: غلوت + كتف",
      safety:"لو احست بألم في الرقبة — ابص للأمام مش للأعلى",
      tips:["جسمك خط مستقيم من كعبك لراسك","ورك مرفوع — مش ساقط","30 ثانية كل جنب","تنفس عادي"],
      cue:"⏱ 30 ← 45 ثانية كل جنب",
      video:"https://www.tiktok.com/search?q=شرح+تمرين+side+plank+بلانك+جانبي" },
    { name:"Ab Crunch", type:"reps", unit:null, startWeight:null,
      presets:[{r:12},{r:15}],
      muscles:"🎯 رئيسي: بطن علوي (Rectus Abdominis)\n⚡ مساعد: هيب فليكسور",
      safety:"مش بترفع جسمك كله — الحركة صغيرة ومركّزة",
      tips:["مش بترفع جسمك كله","الحركة من الصدر لفوق بس","زفير وانت بتطلع","إيديك على صدرك"],
      cue:"🎯 بطن",
      video:"https://www.tiktok.com/search?q=شرح+تمرين+بطن+كرنش+abs+crunch" },
  ],
};

const C = {
  "Upper 1":{ bg:"#1e3a5f", accent:"#3b82f6", emoji:"💪" },
  "Lower 1":{ bg:"#14532d", accent:"#22c55e", emoji:"🦵" },
  "Upper 2":{ bg:"#3b0764", accent:"#a855f7", emoji:"🏋️" },
  "Lower 2":{ bg:"#7c2d12", accent:"#f97316", emoji:"🔥" },
};

const TODAY_ISO = new Date().toISOString().split("T")[0];
const TODAY_AR  = new Date().toLocaleDateString("ar-EG",{weekday:"long",year:"numeric",month:"long",day:"numeric"});

const getStorage  = () => { try{ return JSON.parse(localStorage.getItem("wt_ahmed_v4")||"[]"); }catch{ return []; } };
const saveStorage = d  => { try{ localStorage.setItem("wt_ahmed_v4", JSON.stringify(d)); }catch{} };
const getProfile  = () => { try{ return JSON.parse(localStorage.getItem("wt_profile")||"null"); }catch{ return null; } };
const saveProfile = p  => { try{ localStorage.setItem("wt_profile", JSON.stringify(p)); }catch{} };

const calcVolume = exercises => exercises.reduce((t,ex) => {
  if(ex.type!=="reps") return t;
  return t + ex.sets.reduce((s,set)=>s+((parseFloat(set.weight)||0)*(parseInt(set.reps)||0)),0);
},0);

const initSets = exercises => exercises.map(ex=>({
  name:ex.name, type:ex.type, unit:ex.unit, startWeight:ex.startWeight,
  cue:ex.cue, tips:ex.tips, muscles:ex.muscles, safety:ex.safety, video:ex.video,
  sets: (ex.presets||[{},{}]).map((pre)=>
    ex.type==="time"
      ? {duration:pre.duration||"", targetDuration:pre.target||"", done:false}
      : {weight:String(pre.w!=null?pre.w:ex.startWeight||""), unit:ex.unit||"kg", reps:String(pre.r!=null?pre.r:""), done:false}
  ),
}));

// ── GEMINI PROMPT (Ahmed Format) ─────────────────────────────────────────────
function buildPrompt(session, history, profile) {
  const p = profile || PROFILE;
  const prev = history.filter(h=>h.workout===session.workout).slice(-2)[0] || null;
  const vol = calcVolume(session.exercises);
  const mins = session.durationMins || "—";
  const lines = [];
  lines.push("أنا أحمد، 38 سنة، مستمر على المونجارو 5mg.");
  lines.push("إليك التقرير البرمجي الصافي والمحدث لتمرينة اليوم، والمطلوب منك تحليله ومقارنته بالجلسة السابقة ومطابقته مع لقطات شاشة الساعة المرفقة:\n");
  lines.push("1. [بيانات الجلسة الحالية]:");
  lines.push("• اسم الجلسة: " + session.workout);
  lines.push("• التاريخ: " + session.date);
  lines.push("• الوقت الإجمالي للتمرين: " + mins + " دقيقة");
  lines.push("• إجمالي الحجم التدريبي (Total Volume): " + (vol > 0 ? vol.toLocaleString() + " (mixed kg/lb)" : "—") + "\n");
  lines.push("2. [سجل الأداء الفعلي للمجموعتين]:");
  session.exercises.forEach(ex => {
    if (ex.type === "reps") {
      const s1 = ex.sets[0]; const s2 = ex.sets[1]||{};
      const u1 = s1.unit||""; const u2 = s2.unit||u1;
      lines.push("• " + ex.name + ":");
      lines.push("  جولة 1: " + (s1.weight||"—") + u1 + " × " + (s1.reps||"—") + " عدات " + (s1.done?"✅":"⬜"));
      lines.push("  جولة 2: " + (s2.weight||"—") + u2 + " × " + (s2.reps||"—") + " عدات " + (s2.done?"✅":"⬜"));
      if(prev){ const pe=prev.exercises.find(e=>e.name===ex.name); if(pe&&pe.sets){
        const cb=ex.sets.reduce((b,s)=>Math.max(b,parseFloat(s.weight)||0),0);
        const pb=pe.sets.reduce((b,s)=>Math.max(b,parseFloat(s.weight)||0),0);
        if(cb&&pb){const d=(cb-pb).toFixed(1); lines.push("  مقارنة بالسابق: " + (d>0?"↑":d<0?"↓":"=") + Math.abs(d) + u1);}
      }}
    } else {
      lines.push("• " + ex.name + ":");
      ex.sets.forEach((s,i) => lines.push("  جولة " + (i+1) + ": " + (s.duration||"—") + " " + (s.done?"✅":"⬜")));
    }
  });
  lines.push("\n3. [بيانات الاستشفاء والساعة]:");
  lines.push("  (مرفق لقطات الشاشة للساعة بالأسفل لقراءتها وتحليل جودة النوم، الـ REM، نبضات التمرين، ومعدل التعافي).\n");
  lines.push("بناءً على هذا، أعطني: تقييم الشدة، المقارنة الدقيقة، الأوزان المقترحة للجلسة القادمة، وتحديث خطة المكملات.");
  return lines.join("\n");
}

// ── SELECT SCREEN ─────────────────────────────────────────────────────────────
function SelectScreen({onSelect}){
  const history=getStorage(); const p=getProfile()||PROFILE;
  const last=history.length>0?history[history.length-1]:null;
  return(
    <div style={{minHeight:"100vh",background:"#0a0f1a",fontFamily:"'Inter',system-ui,sans-serif"}}>
      <style>{ANIM_STYLE}</style>
      <div style={{background:"linear-gradient(135deg,#1e293b,#0f172a)",padding:"20px 16px 16px",borderBottom:"1px solid #1e293b"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
          <div>
            <div style={{color:"#64748b",fontSize:11,letterSpacing:1}}>مرحباً</div>
            <div style={{color:"#f8fafc",fontWeight:800,fontSize:20}}>أحمد 💪</div>
            <div style={{color:"#64748b",fontSize:12,marginTop:2}}>{TODAY_AR}</div>
          </div>
          <button onClick={()=>onSelect("__profile__")} style={{background:"#1e293b",border:"1px solid #334155",borderRadius:10,padding:"8px 12px",color:"#64748b",cursor:"pointer",fontSize:12}}>⚙️ بياناتي</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8}}>
          {[["الوزن",`${p.weight||87} kg`,"#3b82f6"],["العضلات",`${p.muscle||62.6} kg`,"#22c55e"],["الدهون",`${p.fat||20.8} kg`,"#f97316"],["جلسات",history.length,"#a855f7"]].map(([l,v,c])=>(
            <div key={l} style={{background:"#0f172a",borderRadius:10,padding:"8px 6px",textAlign:"center"}}>
              <div style={{color:"#475569",fontSize:9,marginBottom:3}}>{l}</div>
              <div style={{color:c,fontWeight:700,fontSize:13}}>{v}</div>
            </div>
          ))}
        </div>
        {last&&<div style={{marginTop:10,background:"#0f172a",borderRadius:8,padding:"7px 10px",display:"flex",justifyContent:"space-between"}}><span style={{color:"#475569",fontSize:11}}>آخر تدريب:</span><span style={{color:"#94a3b8",fontSize:11,fontWeight:600}}>{last.workout} — {last.date}</span></div>}
      </div>
      <div style={{padding:"20px 16px"}}>
        <div style={{color:"#475569",fontSize:12,marginBottom:12,letterSpacing:1}}>اختر تدريب اليوم</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {Object.keys(WORKOUTS).map(name=>{
            const c=C[name]; const sessions=history.filter(h=>h.workout===name); const lastW=sessions.length>0?sessions[sessions.length-1].date:null;
            return(
              <button key={name} onClick={()=>onSelect(name)}
                style={{background:c.bg,border:`1.5px solid ${c.accent}33`,borderRadius:18,padding:"20px 14px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:8,transition:"all 0.15s",boxShadow:"0 4px 20px rgba(0,0,0,0.4)"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.04)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";}}>
                <span style={{fontSize:28}}>{c.emoji}</span>
                <span style={{color:"#f8fafc",fontWeight:700,fontSize:14}}>{name}</span>
                <span style={{color:c.accent,fontSize:10}}>{sessions.length>0?`آخر مرة: ${lastW}`:`${WORKOUTS[name].length} تمارين`}</span>
              </button>
            );
          })}
        </div>
        <button onClick={()=>onSelect("__history__")} style={{width:"100%",marginTop:14,background:"transparent",border:"1px solid #1e293b",borderRadius:12,padding:"12px",color:"#64748b",cursor:"pointer",fontSize:13,fontWeight:600}}>📊 السجل والتحليل</button>
      </div>
    </div>
  );
}

// ── PROFILE SCREEN ────────────────────────────────────────────────────────────
function ProfileScreen({onBack}){
  const saved=getProfile()||PROFILE;
  const [form,setForm]=useState({weight:saved.weight,muscle:saved.muscle,fat:saved.fat,visceralFat:saved.visceralFat});
  const [done,setDone]=useState(false);
  const handleSave=()=>{ saveProfile({...PROFILE,...form}); setDone(true); setTimeout(onBack,1200); };
  return(
    <div style={{minHeight:"100vh",background:"#0a0f1a",fontFamily:"'Inter',system-ui,sans-serif"}}>
      <div style={{background:"#1e293b",padding:"20px 16px",borderBottom:"1px solid #334155",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.08)",border:"none",borderRadius:8,padding:"7px 11px",color:"#e2e8f0",cursor:"pointer",fontSize:15}}>←</button>
        <div style={{color:"#f8fafc",fontWeight:800,fontSize:18}}>⚙️ بياناتي الجسمانية</div>
      </div>
      <div style={{padding:20}}>
        <div style={{background:"#1e293b",borderRadius:16,padding:16,marginBottom:16,border:"1px solid #334155"}}>
          <div style={{color:"#64748b",fontSize:12,marginBottom:14}}>حدّث بعد كل InBody — بتتضمن في Gemini Prompt تلقائياً</div>
          {[["weight","الوزن الكلي (kg)"],["muscle","الكتلة العضلية (kg)"],["fat","الدهون (kg)"],["visceralFat","Visceral Fat Rating"]].map(([k,l])=>(
            <div key={k} style={{marginBottom:14}}>
              <label style={{color:"#94a3b8",fontSize:12,display:"block",marginBottom:6}}>{l}</label>
              <input type="number" step="0.1" value={form[k]} onChange={e=>setForm(f=>({...f,[k]:parseFloat(e.target.value)}))}
                style={{width:"100%",background:"#0f172a",border:"1px solid #334155",borderRadius:10,padding:"12px 14px",color:"#f8fafc",fontSize:16,fontWeight:700,boxSizing:"border-box",outline:"none"}}/>
            </div>
          ))}
        </div>
        <button onClick={handleSave} style={{width:"100%",background:done?"#22c55e":"#3b82f6",border:"none",borderRadius:12,padding:14,color:"#fff",cursor:"pointer",fontSize:15,fontWeight:700,transition:"background 0.3s"}}>
          {done?"✅ تم الحفظ!":"💾 حفظ البيانات"}
        </button>
      </div>
    </div>
  );
}

// ── WORKOUT SCREEN ────────────────────────────────────────────────────────────
function WorkoutScreen({workoutName,onFinish,onBack}){
  const c=C[workoutName];
  const [data,setData]=useState(()=>initSets(WORKOUTS[workoutName]));
  const [activeEx,setActiveEx]=useState(0);
  const startTime = useRef(Date.now());
  const [showTips,setShowTips]=useState(false);
  const [showAnim,setShowAnim]=useState(true);
  const [timer,setTimer]=useState({active:false,seconds:0,exIdx:null,setIdx:null});

  useEffect(()=>{ let iv; if(timer.active) iv=setInterval(()=>setTimer(t=>({...t,seconds:t.seconds+1})),1000); return()=>clearInterval(iv); },[timer.active]);

  // ── REST TIMER + AUDIO ────────────────────────────────────────────────────
  const [rest, setRest] = useState({active:false, seconds:90});
  const restSecondsRef = useRef(90);
  const audioCtxRef = useRef(null);

  const getAudioCtx = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playBeep = (freq, dur, vol) => {
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq || 880;
      osc.type = "sine";
      gain.gain.setValueAtTime(vol || 0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (dur || 0.18));
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + (dur || 0.18));
    } catch(e){ console.log("beep error:", e); }
  };

  const playDone = () => {
    try {
      const ctx = getAudioCtx();
      [[0, 880], [0.2, 1047], [0.4, 1319]].forEach(([t, freq]) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = "sine";
        gain.gain.setValueAtTime(0.6, ctx.currentTime + t);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.4);
        osc.start(ctx.currentTime + t);
        osc.stop(ctx.currentTime + t + 0.45);
      });
    } catch(e){ console.log("done error:", e); }
  };

  useEffect(() => {
    if (!rest.active) return;
    restSecondsRef.current = rest.seconds;
    const iv = setInterval(() => {
      restSecondsRef.current -= 1;
      const next = restSecondsRef.current;
      if (next <= 0) {
        clearInterval(iv);
        playDone();
        setRest({active:false, seconds:90});
        return;
      }
      if (next <= 10) {
        playBeep(next <= 5 ? 1047 : 880, 0.15, 0.5);
      }
      setRest(r => ({...r, seconds: next}));
    }, 1000);
    return () => clearInterval(iv);
  }, [rest.active]);

  const startRest = () => {
    // Resume AudioContext on user gesture
    try { getAudioCtx(); } catch(e){}
    restSecondsRef.current = 90;
    setRest({active:true, seconds:90});
  };

  const update=(ei,si,field,val)=>setData(d=>d.map((ex,i)=>i!==ei?ex:{...ex,sets:ex.sets.map((s,j)=>j!==si?s:{...s,[field]:val})}));
  const toggleTimer=(ei,si)=>{ if(timer.active&&timer.exIdx===ei&&timer.setIdx===si){ update(ei,si,"duration",`${timer.seconds}s`); setTimer({active:false,seconds:0,exIdx:null,setIdx:null}); } else { setTimer({active:true,seconds:0,exIdx:ei,setIdx:si}); } };
  const handleFinish=()=>{ const h=getStorage(); const mins=Math.round((Date.now()-startTime.current)/60000); const s={date:TODAY_ISO,workout:workoutName,exercises:data,durationMins:mins}; h.push(s); saveStorage(h); onFinish(s,h); };

  const progress=data.reduce((a,ex)=>a+ex.sets.filter(s=>s.done).length,0);
  const total=data.reduce((a,ex)=>a+ex.sets.length,0);
  const pct=Math.round((progress/total)*100);
  const ex=data[activeEx];

  const getHint=ex=>{ const f=ex.sets.filter(s=>s.reps&&s.weight); if(!f.length) return null; const mn=Math.min(...f.map(s=>parseInt(s.reps)||0)); const u=f[0].unit||"kg"; if(mn>=12) return{msg:`🔥 ممتاز! ${mn} عدات — الجلسة الجاية زوّد ${u==="kg"?"2.5":"5"} ${u}`,color:"#22c55e"}; if(mn>=10) return{msg:`💪 كويس! وصّل لـ 12 عدة الأول قبل ما تزوّد وزن`,color:"#f59e0b"}; if(mn<8) return{msg:`⚠️ الوزن تقيل — فكر تخفف ${u==="kg"?"2.5":"5"} ${u}`,color:"#ef4444"}; return null; };
  const hint=ex.type==="reps"?getHint(ex):null;

  return(
    <div style={{minHeight:"100vh",background:"#0a0f1a",fontFamily:"'Inter',system-ui,sans-serif",paddingBottom:32}}>
      <style>{ANIM_STYLE}</style>
      {/* Header */}
      <div style={{background:c.bg,padding:"16px 16px 14px",borderBottom:`2px solid ${c.accent}33`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:8,padding:"7px 11px",color:"#e2e8f0",cursor:"pointer",fontSize:15}}>←</button>
          <div style={{flex:1}}>
            <div style={{color:c.accent,fontSize:11,letterSpacing:1}}>{c.emoji} {TODAY_AR.split("،")[0]}</div>
            <div style={{color:"#f8fafc",fontWeight:800,fontSize:18}}>{workoutName}</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{color:c.accent,fontWeight:800,fontSize:20}}>{pct}%</div>
            <div style={{color:"#64748b",fontSize:11}}>{progress}/{total}</div>
          </div>
        </div>
        <div style={{background:"rgba(255,255,255,0.1)",borderRadius:99,height:4}}><div style={{background:c.accent,borderRadius:99,height:4,width:`${pct}%`,transition:"width 0.4s"}}/></div>
        <div style={{display:"flex",gap:6,marginTop:10,overflowX:"auto",paddingBottom:2}}>
          {data.map((ex,i)=>{ const done=ex.sets.every(s=>s.done); return(
            <button key={i} onClick={()=>{setActiveEx(i);setShowTips(false);setShowAnim(true);}}
              style={{background:i===activeEx?c.accent:done?`${c.accent}22`:"rgba(255,255,255,0.07)",border:"none",borderRadius:20,padding:"5px 11px",color:i===activeEx?"#fff":done?c.accent:"#94a3b8",cursor:"pointer",fontSize:11,whiteSpace:"nowrap",fontWeight:600,flexShrink:0}}>
              {done?"✓ ":""}{ex.name.split(" ").slice(0,2).join(" ")}
            </button>
          );})}
        </div>
      </div>

      <div style={{padding:"14px 16px"}}>
        {/* Exercise card */}
        <div style={{background:"#1e293b",borderRadius:18,padding:16,border:`1px solid ${c.accent}22`,marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
            <div style={{flex:1}}>
              <h2 style={{color:"#f8fafc",fontSize:16,fontWeight:700,margin:"0 0 3px"}}>{ex.name}</h2>
              <div style={{color:c.accent,fontSize:11,fontWeight:600}}>{ex.cue}</div>
            </div>
            <div style={{display:"flex",gap:6}}>
              <button onClick={()=>setShowAnim(!showAnim)} style={{background:showAnim?c.accent:"rgba(255,255,255,0.07)",border:"none",borderRadius:8,padding:"6px 10px",color:showAnim?"#fff":"#64748b",cursor:"pointer",fontSize:11,flexShrink:0}}>🎬</button>
              <button onClick={()=>setShowTips(!showTips)} style={{background:showTips?c.accent:"rgba(255,255,255,0.07)",border:"none",borderRadius:8,padding:"6px 10px",color:showTips?"#fff":"#64748b",cursor:"pointer",fontSize:11,flexShrink:0}}>💡</button>
            </div>
          </div>

          {/* Animation */}
          {showAnim&&(
            <div style={{background:"#0f172a",borderRadius:12,padding:"12px 8px",marginBottom:12,border:`1px solid ${c.accent}22`,display:"flex",justifyContent:"center"}}>
              <ExerciseAnim name={ex.name} accent={c.accent}/>
            </div>
          )}

          {/* Tips + Muscles + Safety + Video */}
          {showTips&&(
            <div style={{background:"#0f172a",borderRadius:12,padding:14,marginBottom:12,border:`1px solid ${c.accent}33`}}>
              {/* Muscles */}
              <div style={{marginBottom:10}}>
                <div style={{color:c.accent,fontSize:11,fontWeight:700,marginBottom:4}}>💪 العضلات المستهدفة</div>
                <div style={{color:"#e2e8f0",fontSize:12,background:`${c.accent}11`,borderRadius:8,padding:"6px 10px"}}>{ex.muscles||"—"}</div>
              </div>
              {/* Safety */}
              <div style={{marginBottom:10}}>
                <div style={{color:"#ef4444",fontSize:11,fontWeight:700,marginBottom:4}}>⚠️ تحذير السلامة</div>
                <div style={{color:"#fca5a5",fontSize:12,background:"#450a0a",borderRadius:8,padding:"6px 10px"}}>{ex.safety||"—"}</div>
              </div>
              {/* Tips */}
              <div style={{marginBottom:ex.video?10:0}}>
                <div style={{color:"#f59e0b",fontSize:11,fontWeight:700,marginBottom:6}}>✅ نصايح الأداء</div>
                {ex.tips.map((tip,i)=>(
                  <div key={i} style={{color:"#94a3b8",fontSize:12,lineHeight:1.8,display:"flex",gap:8}}>
                    <span style={{color:c.accent,flexShrink:0}}>•</span>{tip}
                  </div>
                ))}
              </div>
              {/* Video Button */}
              {ex.video&&(
                <a href={ex.video} target="_blank" rel="noopener noreferrer"
                  style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:"#dc2626",borderRadius:10,padding:"10px",color:"#fff",textDecoration:"none",fontSize:13,fontWeight:700,marginTop:10}}>
                  ▶ شوف الفيديو التعليمي على YouTube
                </a>
              )}
            </div>
          )}

          {/* Sets */}
          {ex.sets.map((set,si)=>(
            <div key={si} style={{background:set.done?`${c.accent}11`:"#0f172a",borderRadius:12,padding:12,marginBottom:8,border:`1px solid ${set.done?c.accent+"44":"#1e293b"}`,transition:"all 0.2s"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:ex.type==="reps"?10:8}}>
                <span style={{color:set.done?c.accent:"#475569",fontWeight:700,fontSize:12}}>SET {si+1}</span>
                <button onClick={()=>{ update(activeEx,si,"done",!set.done); if(!set.done) startRest(); }}
                  style={{background:set.done?c.accent:"transparent",border:`2px solid ${set.done?c.accent:"#334155"}`,borderRadius:99,width:26,height:26,cursor:"pointer",color:set.done?"#fff":"#64748b",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  {set.done?"✓":"○"}
                </button>
              </div>
              {ex.type==="reps"?(
                <div style={{display:"grid",gridTemplateColumns:"1fr 68px 1fr",gap:8}}>
                  {[["وزن","weight"],["وحدة","unit"],["عدات","reps"]].map(([label,field])=>
                    field==="unit"?(
                      <div key={field}>
                        <div style={{color:"#475569",fontSize:9,marginBottom:4,textAlign:"center"}}>وحدة</div>
                        <select value={set.unit} onChange={e=>update(activeEx,si,"unit",e.target.value)}
                          style={{width:"100%",background:"#1e293b",border:"1px solid #334155",borderRadius:8,padding:"8px 4px",color:"#94a3b8",fontSize:12,fontWeight:600,outline:"none",textAlign:"center"}}>
                          <option>kg</option><option>lb</option>
                        </select>
                      </div>
                    ):(
                      <div key={field}>
                        <div style={{color:"#475569",fontSize:9,marginBottom:4,textAlign:"center"}}>{label}</div>
                        <input type="number" value={set[field]} onChange={e=>update(activeEx,si,field,e.target.value)} placeholder="0"
                          style={{width:"100%",background:"#1e293b",border:"1px solid #334155",borderRadius:8,padding:"8px 10px",color:"#f8fafc",fontSize:18,fontWeight:700,boxSizing:"border-box",outline:"none",textAlign:"center"}}/>
                      </div>
                    )
                  )}
                </div>
              ):(
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <div style={{flex:1,background:"#1e293b",borderRadius:10,padding:"10px",textAlign:"center"}}>
                    <span style={{color:timer.active&&timer.exIdx===activeEx&&timer.setIdx===si?c.accent:"#f8fafc",fontSize:24,fontWeight:800,fontVariantNumeric:"tabular-nums"}}>
                      {timer.active&&timer.exIdx===activeEx&&timer.setIdx===si?`${Math.floor(timer.seconds/60)}:${String(timer.seconds%60).padStart(2,"0")}`:set.duration||"0:00"}
                    </span>
                  </div>
                  <button onClick={()=>toggleTimer(activeEx,si)}
                    style={{background:timer.active&&timer.exIdx===activeEx&&timer.setIdx===si?"#dc2626":c.accent,border:"none",borderRadius:10,padding:"12px 14px",color:"#fff",cursor:"pointer",fontSize:18}}>
                    {timer.active&&timer.exIdx===activeEx&&timer.setIdx===si?"⏹":"▶"}
                  </button>
                </div>
              )}
            </div>
          ))}
          {hint&&<div style={{background:`${hint.color}11`,borderRadius:10,padding:"10px 12px",border:`1px solid ${hint.color}33`,marginTop:4}}><span style={{color:hint.color,fontSize:12,fontWeight:600}}>{hint.msg}</span></div>}
        </div>

        {/* REST TIMER */}
        {rest.active && (
          <div style={{background:rest.seconds<=10?"#450a0a":"#1e293b", borderRadius:16, padding:"14px 20px", marginBottom:12, border:"1px solid " + (rest.seconds<=10?"#dc2626":"#334155"), display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <div>
              <div style={{color:rest.seconds<=10?"#ef4444":"#64748b", fontSize:11, fontWeight:700}}>⏳ راحة</div>
              <div style={{color:rest.seconds<=10?"#ef4444":"#f8fafc", fontSize:32, fontWeight:800, fontVariantNumeric:"tabular-nums"}}>{Math.floor(rest.seconds/60)}:{String(rest.seconds%60).padStart(2,"0")}</div>
            </div>
            <button onClick={()=>setRest({active:false,seconds:90})} style={{background:"#334155",border:"none",borderRadius:10,padding:"8px 14px",color:"#94a3b8",cursor:"pointer",fontSize:12}}>تخطي</button>
          </div>
        )}
        {/* Nav */}
        <div style={{display:"flex",gap:10}}>
          {activeEx>0&&<button onClick={()=>{setActiveEx(activeEx-1);setShowTips(false);setShowAnim(true);}} style={{flex:1,background:"#1e293b",border:"1px solid #334155",borderRadius:12,padding:12,color:"#94a3b8",cursor:"pointer",fontSize:13,fontWeight:600}}>← السابق</button>}
          {activeEx<data.length-1
            ?<button onClick={()=>{setActiveEx(activeEx+1);setShowTips(false);setShowAnim(true);}} style={{flex:1,background:c.accent,border:"none",borderRadius:12,padding:12,color:"#fff",cursor:"pointer",fontSize:13,fontWeight:700}}>التالي →</button>
            :<button onClick={handleFinish} style={{flex:1,background:`linear-gradient(135deg,${c.accent},#22c55e)`,border:"none",borderRadius:12,padding:12,color:"#fff",cursor:"pointer",fontSize:14,fontWeight:700}}>🏁 إنهاء وتوليد التقرير</button>
          }
        </div>
      </div>
    </div>
  );
}

// ── REPORT SCREEN ─────────────────────────────────────────────────────────────
function ReportScreen({session,history,onHome}){
  const c=C[session.workout];
  const [copied,setCopied]=useState(false);
  const profile=getProfile();
  const prompt=buildPrompt(session,history,profile);
  const vol=calcVolume(session.exercises);
  const prev=history.filter(h=>h.workout===session.workout).slice(-2)[0]||null;
  const prevVol=prev?calcVolume(prev.exercises):null;
  const volDiff=prevVol!==null?vol-prevVol:null;
  const doneSets=session.exercises.reduce((a,ex)=>a+ex.sets.filter(s=>s.done).length,0);
  const totalSets=session.exercises.reduce((a,ex)=>a+ex.sets.length,0);
  const copy=()=>{ navigator.clipboard.writeText(prompt).catch(()=>{ const ta=document.createElement("textarea"); ta.value=prompt; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); }); setCopied(true); setTimeout(()=>setCopied(false),3000); };

  return(
    <div style={{minHeight:"100vh",background:"#0a0f1a",fontFamily:"'Inter',system-ui,sans-serif",paddingBottom:40}}>
      <div style={{background:`linear-gradient(135deg,${c.bg},#0a0f1a)`,padding:"28px 20px 20px",textAlign:"center",borderBottom:`1px solid ${c.accent}22`}}>
        <div style={{fontSize:44,marginBottom:8}}>🏆</div>
        <h1 style={{color:"#f8fafc",fontSize:20,fontWeight:800,margin:"0 0 4px"}}>تدريب منتهي يا أحمد!</h1>
        <p style={{color:c.accent,fontSize:13,fontWeight:600,margin:0}}>{session.workout} — {session.date}</p>
      </div>
      <div style={{padding:"16px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16}}>
          {[["Sets",`${doneSets}/${totalSets}`,doneSets===totalSets?"#22c55e":c.accent],["Volume",vol>0?vol.toLocaleString():"—",c.accent],["vs السابق",volDiff!==null?`${volDiff>=0?"+":""}${volDiff.toLocaleString()}`:"أول جلسة",volDiff>0?"#22c55e":volDiff<0?"#ef4444":"#64748b"]].map(([l,v,cl])=>(
            <div key={l} style={{background:"#1e293b",borderRadius:12,padding:"12px 8px",textAlign:"center",border:"1px solid #334155"}}>
              <div style={{color:"#475569",fontSize:10,marginBottom:4}}>{l}</div>
              <div style={{color:cl,fontWeight:800,fontSize:14}}>{v}</div>
            </div>
          ))}
        </div>
        {/* Summary */}
        <div style={{background:"#1e293b",borderRadius:16,padding:14,marginBottom:14,border:"1px solid #334155"}}>
          <div style={{color:"#475569",fontSize:11,fontWeight:700,letterSpacing:1,marginBottom:10}}>ملخص التمارين</div>
          {session.exercises.map((ex,i)=>{
            const pe=prev?.exercises?.find(e=>e.name===ex.name);
            const cb=ex.type==="reps"?ex.sets.reduce((b,s)=>Math.max(b,parseFloat(s.weight)||0),0):null;
            const pb=pe?.type==="reps"?pe.sets.reduce((b,s)=>Math.max(b,parseFloat(s.weight)||0),0):null;
            const diff=cb&&pb?cb-pb:null;
            const unit=ex.sets[0]?.unit||"kg";
            return(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:i<session.exercises.length-1?"1px solid #0f172a":"none"}}>
                <span style={{color:"#94a3b8",fontSize:12}}>{ex.name}</span>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  {ex.type==="reps"?(<>
                    <span style={{color:"#475569",fontSize:11}}>{ex.sets.map(s=>s.reps||"?").join("/")} reps</span>
                    <span style={{color:c.accent,fontWeight:700,fontSize:12}}>{cb>0?`${cb}${unit}`:"—"}</span>
                    {diff!==null&&<span style={{color:diff>0?"#22c55e":diff<0?"#ef4444":"#64748b",fontSize:11,fontWeight:700}}>{diff>0?`↑${diff}`:diff<0?`↓${Math.abs(diff)}`:"="}</span>}
                  </>):(<span style={{color:c.accent,fontSize:11}}>⏱ {ex.sets.map(s=>s.duration||"?").join(" / ")}</span>)}
                </div>
              </div>
            );
          })}
        </div>
        {/* Gemini */}
        <div style={{background:"linear-gradient(135deg,#1e293b,#0f1f35)",borderRadius:18,padding:16,marginBottom:12,border:`1px solid ${c.accent}33`}}>
          <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:10}}>
            <span style={{fontSize:22}}>🤖</span>
            <div>
              <div style={{color:"#f8fafc",fontWeight:700,fontSize:14}}>Gemini Prompt جاهز</div>
              <div style={{color:"#475569",fontSize:11}}>فيه كل بياناتك + المقارنة + الأسئلة</div>
            </div>
          </div>
          <div style={{background:"#0a0f1a",borderRadius:10,padding:12,marginBottom:10,maxHeight:130,overflowY:"auto",border:"1px solid #1e293b"}}>
            <pre style={{color:"#64748b",fontSize:10,lineHeight:1.7,margin:0,whiteSpace:"pre-wrap",fontFamily:"monospace"}}>{prompt.slice(0,400)}...</pre>
          </div>
          <button onClick={copy} style={{width:"100%",background:copied?"#22c55e":`linear-gradient(135deg,#3b82f6,${c.accent})`,border:"none",borderRadius:12,padding:"14px",color:"#fff",cursor:"pointer",fontSize:15,fontWeight:700,transition:"all 0.3s"}}>
            {copied?"✅ تم النسخ! افتح Gemini والصق":"📋 نسخ الـ Prompt لـ Gemini"}
          </button>
          {copied&&<div style={{marginTop:10,background:"#052e16",borderRadius:10,padding:"10px 14px",border:"1px solid #166534"}}><div style={{color:"#86efac",fontSize:12,lineHeight:1.8}}>✅ جاهز! افتح <strong>gemini.google.com</strong> ← Paste ← Send 🚀</div></div>}
        </div>
        <button onClick={onHome} style={{width:"100%",background:"transparent",border:"1px solid #1e293b",borderRadius:12,padding:12,color:"#475569",cursor:"pointer",fontSize:13}}>🏠 الرئيسية</button>
      </div>
    </div>
  );
}

// ── HISTORY SCREEN ────────────────────────────────────────────────────────────
function HistoryScreen({onBack}){
  const [history]=useState(getStorage);
  const [tab,setTab]=useState("log");
  const exStats=()=>{ const s={}; history.forEach(h=>h.exercises.forEach(ex=>{ if(!s[ex.name])s[ex.name]=[]; ex.sets.forEach(set=>{if(set.weight&&set.reps)s[ex.name].push({date:h.date,weight:parseFloat(set.weight),reps:parseInt(set.reps),unit:set.unit});}); })); return s; };
  return(
    <div style={{minHeight:"100vh",background:"#0a0f1a",fontFamily:"'Inter',system-ui,sans-serif",paddingBottom:40}}>
      <div style={{background:"#1e293b",padding:"16px 16px 0",borderBottom:"1px solid #334155"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.08)",border:"none",borderRadius:8,padding:"7px 11px",color:"#e2e8f0",cursor:"pointer",fontSize:15}}>←</button>
          <div style={{color:"#f8fafc",fontWeight:800,fontSize:18}}>📊 السجل والتحليل</div>
        </div>
        <div style={{display:"flex",background:"#0a0f1a",borderRadius:10,padding:3,marginBottom:14}}>
          {[["log","📋 السجل"],["analysis","📈 تحليل"],["compare","⚖️ مقارنة"]].map(([t,l])=>(
            <button key={t} onClick={()=>setTab(t)} style={{flex:1,background:tab===t?"#3b82f6":"transparent",border:"none",borderRadius:8,padding:"7px 0",color:tab===t?"#fff":"#64748b",cursor:"pointer",fontSize:12,fontWeight:600}}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{padding:16}}>
        {tab==="log"&&(history.length===0
          ?<div style={{textAlign:"center",padding:60,color:"#475569"}}><div style={{fontSize:48}}>🏋️</div><p>لا يوجد تدريبات بعد</p></div>
          :[...history].reverse().map((s,i)=>{ const c=C[s.workout]||{accent:"#3b82f6",emoji:"💪"}; const vol=calcVolume(s.exercises); return(
            <div key={i} style={{background:"#1e293b",borderRadius:14,padding:14,marginBottom:10,border:"1px solid #334155"}}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <div><div style={{color:"#f8fafc",fontWeight:700,fontSize:14}}>{c.emoji} {s.workout}</div><div style={{color:"#64748b",fontSize:12,marginTop:2}}>{s.date}</div></div>
                <div style={{textAlign:"right"}}>{vol>0&&<div style={{color:c.accent,fontWeight:700,fontSize:14}}>{vol.toLocaleString()}</div>}<div style={{color:"#64748b",fontSize:11}}>{s.exercises.reduce((a,ex)=>a+ex.sets.filter(x=>x.done).length,0)}/{s.exercises.reduce((a,ex)=>a+ex.sets.length,0)} sets</div></div>
              </div>
            </div>
          );})
        )}
        {tab==="analysis"&&(()=>{ const stats=exStats(); const keys=Object.keys(stats); if(!keys.length) return <div style={{textAlign:"center",padding:60,color:"#475569"}}><div style={{fontSize:48}}>📈</div><p>سجل تدريبات أول</p></div>;
          return keys.map(name=>{ const e=stats[name]; if(!e.length) return null; const mW=Math.max(...e.map(x=>x.weight)); const aR=Math.round(e.reduce((a,x)=>a+x.reps,0)/e.length); const trend=e.length>1?(e[e.length-1].weight>e[0].weight?"📈 تحسن":e[e.length-1].weight<e[0].weight?"📉 تراجع":"➡️ ثابت"):"—";
            return(<div key={name} style={{background:"#1e293b",borderRadius:14,padding:14,marginBottom:10,border:"1px solid #334155"}}>
              <div style={{color:"#f8fafc",fontWeight:700,fontSize:13,marginBottom:10}}>{name}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:e.length>1?10:0}}>
                {[["أعلى وزن",`${mW}${e[0].unit}`],["متوسط عدات",aR],["اتجاه",trend]].map(([l,v])=>(
                  <div key={l} style={{background:"#0a0f1a",borderRadius:8,padding:"8px 4px",textAlign:"center"}}><div style={{color:"#475569",fontSize:9,marginBottom:3}}>{l}</div><div style={{color:"#f8fafc",fontWeight:700,fontSize:11}}>{v}</div></div>
                ))}
              </div>
              {e.length>1&&<div style={{display:"flex",gap:3,alignItems:"flex-end",height:28}}>{e.slice(-10).map((x,i,arr)=>{ const h=mW>0?Math.max(3,Math.round((x.weight/mW)*28)):3; return <div key={i} style={{flex:1,height:h,background:i===arr.length-1?"#3b82f6":"#334155",borderRadius:2}}/>; })}</div>}
            </div>);
          });
        })()}
        {tab==="compare"&&Object.keys(WORKOUTS).map(wn=>{ const sessions=history.filter(h=>h.workout===wn).slice(-2); const c=C[wn];
          if(sessions.length<2) return(<div key={wn} style={{background:"#1e293b",borderRadius:14,padding:14,marginBottom:10,border:"1px solid #334155",opacity:0.4}}><div style={{color:"#f8fafc",fontWeight:700,fontSize:13}}>{c.emoji} {wn}</div><div style={{color:"#475569",fontSize:12,marginTop:4}}>محتاج جلسيتن للمقارنة</div></div>);
          const[prev,curr]=sessions; const pV=calcVolume(prev.exercises),cV=calcVolume(curr.exercises),diff=cV-pV;
          return(<div key={wn} style={{background:"#1e293b",borderRadius:14,padding:14,marginBottom:10,border:`1px solid ${c.accent}22`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{color:"#f8fafc",fontWeight:700,fontSize:13}}>{c.emoji} {wn}</div><span style={{color:diff>=0?"#22c55e":"#ef4444",fontWeight:700,fontSize:13}}>{diff>=0?"+":""}{diff.toLocaleString()}</span></div>
            {curr.exercises.map((ex,ei)=>{ const pe=prev.exercises[ei]; if(!pe||ex.type==="time") return null; const cA=ex.sets.filter(s=>s.weight).reduce((a,s,_,arr)=>a+parseFloat(s.weight)/arr.length,0); const pA=pe.sets.filter(s=>s.weight).reduce((a,s,_,arr)=>a+parseFloat(s.weight)/arr.length,0); if(!cA&&!pA) return null; const d=(cA-pA).toFixed(1); const u=ex.sets[0]?.unit||"kg";
              return(<div key={ei} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #0a0f1a"}}><span style={{color:"#94a3b8",fontSize:12}}>{ex.name}</span><span style={{color:d>0?"#22c55e":d<0?"#ef4444":"#64748b",fontWeight:600,fontSize:12}}>{pA.toFixed(1)} → {cA.toFixed(1)} {u} {d>0?"↑":d<0?"↓":"="}</span></div>);
            })}
          </div>);
        })}
      </div>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function App(){
  const[screen,setScreen]=useState("select");
  const[activeWorkout,setActiveWorkout]=useState(null);
  const[reportData,setReportData]=useState(null);
  if(screen==="workout") return <WorkoutScreen workoutName={activeWorkout} onBack={()=>setScreen("select")} onFinish={(s,h)=>{setReportData({session:s,history:h});setScreen("report");}}/>;
  if(screen==="report") return <ReportScreen session={reportData.session} history={reportData.history} onHome={()=>setScreen("select")}/>;
  if(screen==="history") return <HistoryScreen onBack={()=>setScreen("select")}/>;
  if(screen==="__profile__") return <ProfileScreen onBack={()=>setScreen("select")}/>;
  return <SelectScreen onSelect={name=>{if(name==="__history__")return setScreen("history");if(name==="__profile__")return setScreen("__profile__");setActiveWorkout(name);setScreen("workout");}}/>;
}
