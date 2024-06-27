import VideoPlayer from "@/app/components/home/VideoPlayer";
import EventsSection from "@/app/components/home/EventsSection";
import events from "@/app/components/home/eventdata";
export default function Home() {
    return (
        <div className="text-white">
            <VideoPlayer/>
            <div className="flex flex-col items-center justify-center py-8 bg-transparent">
                <div className="text-left p-8 max-w-3xl">
                    <h1 className="text-4xl font-bold mb-4 gradient-text">Welcome to Movie Movit!</h1>
                    <p className="text-lg text-white font-handwriting mb-4">
                        MOVIE MOVIT 에서 최신 영화와 관련 이벤트를 소개합니다.
                    </p>
                    <p className="text-2xl text-gray-300 font-bold font-nanum-pen-script mb-4">
                        영화 팬 여러분을 위한 다양한 특별 행사를 만나보세요.<br/>
                        시사회, 굿즈샵, 팬미팅, 그리고 영화 제작 과정 체험 워크샵까지, 영화의 매력에 흠뻑 빠질 수 있는 다채로운 이벤트가 준비되어 있습니다.
                    </p>
                    <p className="text-lg text-white font-handwriting mb-4">
                        최신 영화 정보를 빠르게 확인하고, 영화 팬들과 함께 즐거운 시간을 보내세요.<br/>
                        MOVIE MOVIT 에서는 영화 예고편, 리뷰, 그리고 각종 이벤트 후기들도 함께 제공됩니다.
                    </p>
                    <p className="text-2xl text-gray-300 font-bold font-nanum-pen-script mb-4">
                        MOVIE MOVIT 는 영화 팬 여러분을 위한 최고의 영화 커뮤니티입니다.<br/>
                        지금 바로 다양한 영화 이벤트를 확인하고 참여해보세요!
                    </p>
                </div>
            </div>
            <EventsSection/>
        </div>
    );
}
