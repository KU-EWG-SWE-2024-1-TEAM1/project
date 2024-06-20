"use client";

import YouTubeEmbed from "@/components/youtube";
import React from "react";

const Movies = () => {
  return (
    <main className="main-content">
      <div className="mb-24"></div>
      <div className="youtube-container flex justify-center">
        <YouTubeEmbed videoId="EiCmnIaj4u8" width={560} height={315} />
      </div>
      <div className="mb-24"></div>
      <div className="content-container">
        <div className="image-text-container flex flex-col md:flex-row mb-24 items-center">
          <img
            src="https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20240522_223%2F17163415282489rSoA_JPEG%2Fmovie_image.jpg"
            alt="Image 1"
            className="main-image w-full md:w-1/2 mb-4 md:mb-0 md:mr-8"
          />
          <div className="text-container">
            <p className="text-bold text-xl font-bold text-white">
              비상! 새로운 감정들이 몰려온다!
            </p>
            <p className="text mt-2 text-white">
              디즈니·픽사의 대표작 {"인사이드 아웃"} 새로운 감정과 함께
              돌아오다! 13살이 된 라일리의 행복을 위해 매일 바쁘게 머릿속 감정
              컨트롤 본부를 운영하는 ‘기쁨’, ‘슬픔’, ‘버럭’, ‘까칠’, ‘소심’.
              그러던 어느 날, 낯선 감정인 ‘불안’, ‘당황’, ‘따분’, ‘부럽’이가
              본부에 등장하고, 언제나 최악의 상황을 대비하며 제멋대로인
              ‘불안’이와 기존 감정들은 계속 충돌한다. 결국 새로운 감정들에 의해
              본부에서 쫓겨나게 된 기존 감정들은 다시 본부로 돌아가기 위해
              위험천만한 모험을 시작하는데… 2024년, 전 세계를 공감으로 물들인
              유쾌한 상상이 다시 시작된다!
            </p>
          </div>
        </div>
        <div className="image-text-container flex flex-col md:flex-row mb-24 items-center">
          <div className="text-container mb-4 md:mb-0 md:mr-8">
            <p className="text text-white">
              "그 모든 게 나였다 그 전부가 세월이었다 하나도 남김없이." - 이동진
            </p>
            <p className="text text-white">
              "뒤척이며 잠 못 드는 사이에도 내게 부단히 희망을 주고 있던 사랑의
              존재들" - 이자연
            </p>
            <p className="text text-white">
              "9년, 인물과 영화와 관객이 함께 자라고 변하는 경험" - 이용철
            </p>
            <p className="text text-white">
              "내 감정들과 내 자신을 돌아볼 수 있었던 시간" - 실관람평
            </p>
          </div>
          <img
            src="https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20240522_113%2F1716341630480GlTlT_JPEG%2Fmovie_image.jpg"
            alt="Image 2"
            className="main-image w-full md:w-1/2"
          />
        </div>
        <div className="mb-24"></div>
      </div>
    </main>
  );
};

export default Movies;
