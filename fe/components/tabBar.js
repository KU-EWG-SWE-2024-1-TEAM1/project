import React, { useState } from "react";

const TabBar = () => {
  const tabData = [
    {
      id: 0,
      title: "전시",
      description: "전시정보",
    },
    { id: 1, title: "팝업", description: "팝업정보" },
    { id: 2, title: "굿즈스토어", description: "굿즈스토어정보" },
  ];

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <nav className="flex -mb-px">
        {tabData.map((item) => (
          <div
            key={item.id}
            className={`w-full cursor-pointer py-4 text-center font-bold transition duration-200 ease-in-out ${
              activeTab === item.id
                ? "text-textActive  bg-primary"
                : "text-textInactive bg-gray-300 "
            }`}
            onClick={() => handleTabClick(item.id)}
          >
            {item.title}
          </div>
        ))}
      </nav>

      <div className="py-4">
        {tabData
          .filter((item) => activeTab === item.id)
          .map((item) => (
            <div key={item.id} className="mt-4 text-textActive">
              {item.description}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TabBar;
