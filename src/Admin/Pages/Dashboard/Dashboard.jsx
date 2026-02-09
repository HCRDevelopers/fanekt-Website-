import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import ReactApexChart from "react-apexcharts";
import Tag from "./assets/tag.png";
import Fan from "./assets/fan.png";
import Scan from "./assets/scan.png";
import Compaign from "./assets/compaign.png";
import { IoCalendarOutline, IoChevronDown } from "react-icons/io5";
import { getDashboard } from "../../../API/apiService";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    data: [],
  });
  const [stats, setStats] = useState({
    total_programmed_tags: 0,
    total_activated_tags: 0,
    total_fans: 0,
    fans_registered_this_week: 0,
    active_campaigns: 0,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("This Week");
  const [loading, setLoading] = useState(false);

  const optionsList = ["This Week", "This Month"];

  // 🧠 Helper: calculate date ranges
  const getDateRange = () => {
    const now = new Date();
    let start = new Date();
    let end = new Date();

    if (selected === "This Week") {
      const day = now.getDay();
      start.setDate(now.getDate() - day + (day === 0 ? -6 : 1)); // Monday
      end = new Date(start);
      end.setDate(start.getDate() + 6); // Sunday
    } else if (selected === "This Month") {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    } else if (selected === "This Year") {
      start = new Date(now.getFullYear(), 0, 1);
      end = new Date(now.getFullYear(), 11, 31);
    }

    return {
      start_date: start.toISOString().split("T")[0],
      end_date: end.toISOString().split("T")[0],
    };
  };

  // 🧩 Fetch dashboard data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { start_date, end_date } = getDateRange();

      const res = await getDashboard({
        start_date,
        end_date,
      });

      if (res?.status) {
        const data = res.data.data;
        setStats({
          total_programmed_tags: data.total_programmed_tags,
          total_activated_tags: data.total_activated_tags,
          total_fans: data.total_fans,
          fans_registered_this_week: data.fans_registered_this_week,
          active_campaigns: data.active_campaigns,
        });
        setChartData({
          labels: data.chart.labels,
          data: data.chart.data,
        });
      } else {
        toast.error("Failed to fetch dashboard data");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Error fetching dashboard data");
    } finally {
      setLoading(false);
    }
  }, [selected]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 🧠 Chart config
  const chartConfig = {
    series: [
      {
        name: "Scans",
        data: chartData.data,
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 400,
        toolbar: { show: false },
        background: "transparent",
      },
      stroke: {
        curve: "smooth",
        width: 3,
        colors: ["#f64c68"],
      },
      markers: {
        size: 6,
        colors: ["#f64c68"],
        strokeWidth: 2,
        hover: { size: 9 },
      },
      grid: {
        show: true,
        borderColor: "#ffffff30",
        strokeDashArray: 5,
      },
      xaxis: {
        categories: chartData.labels,
        labels: {
          style: { colors: "#ffffff80", fontSize: "14px" },
        },
      },
      yaxis: {
        min: 0,
        labels: {
          style: { colors: "#ffffff60", fontSize: "14px" },
        },
      },
      tooltip: {
        theme: "dark",
        y: { formatter: (val) => `${val} scans` },
      },
      fill: {
        type: "solid",
        colors: ["#f64c68"],
        opacity: 1,
      },
    },
  };

  // 🧱 Stat Boxes
  const boxes = [
    {
      icon: Tag,
      title: "Total Tags Programmed",
      value: stats.total_programmed_tags,
      subtext: `${stats.total_activated_tags} Activated`,
    },
    {
      icon: Fan,
      title: "Registered Fans",
      value: stats.total_fans,
      subtext: `New this week: ${stats.fans_registered_this_week}`,
    },
    {
      icon: Scan,
      title: "Total Scans (This Period)",
      value: chartData.data.reduce((a, b) => a + b, 0),
      subtext: `${chartData.data.length} days`,
    },
    {
      icon: Compaign,
      title: "Active Campaigns",
      value: stats.active_campaigns,
      subtext: "Running Now",
    },
  ];

  return (
    <div className="lg:ml-[290px] px-4 lg:px-6 py-3 lg:pb-5 lg:pt-5 pt-28">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {boxes.map((box, index) => (
          <motion.div
            key={index}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2, type: "spring" }}
            className="bg-[#3337597b] rounded-[10px] border-[1.5px] p-4 border-[#286db24c] shadow-sm flex flex-col justify-between"
          >
            <img src={box.icon} alt={box.title} className="w-[50px] mb-3" />
            <p className="text-[#ffffff9d] text-[14px]">{box.title}</p>
            <h2 className="text-[#ffff] text-[30px] font-bold">{box.value}</h2>
            <p className="text-[#ffff] text-[14px]">{box.subtext}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-white text-2xl font-semibold mb-1">Scan Trends</h2>
            <p className="text-gray-400 text-sm">
              Scan activity from {selected.toLowerCase()}
            </p>
          </div>

          <div className="relative inline-block text-left">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 bg-[#5b4462] text-white cursor-pointer px-5 py-2.5 rounded-xl font-medium text-[15px] transition-all hover:opacity-90"
            >
              <IoCalendarOutline size={18} />
              <span>{selected}</span>
              <IoChevronDown
                size={16}
                className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#3c3859e3] z-40 backdrop-blur-md text-white rounded-xl shadow-lg border border-[#ffffff20]">
                {optionsList.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelected(option);
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-[#ffffff15] rounded-lg transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-transparent rounded-xl">
          {loading ? (
            <div className="text-white text-center py-20 animate-pulse">
              Loading chart...
            </div>
          ) : (
            <ReactApexChart
              options={chartConfig.options}
              series={chartConfig.series}
              type="line"
              height={400}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
