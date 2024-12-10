"use client";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import apiChart from "@/app/src/services/apiChart";
import { useState, useEffect } from "react";
import styles from '../../../src/admin/styles/shared.module.scss'

interface AppointmentData {
  _id: string | number; 
  count: number; 
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Page = () => {
  const [monthlyData, setMonthlyData] = useState<AppointmentData[]>([]);
  const [yearlyData, setYearlyData] = useState<AppointmentData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getMonthlyAppointments = async (year: number, month: number) => {
    try {
      setLoading(true);
      const response = await apiChart.getAppointmentsMonthly(year.toString(), month.toString());
      setMonthlyData(response.data);
      console.log('datamonth: ', response.data)
    } catch (err) {
      setError("Có lỗi khi tải dữ liệu theo tháng");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getYearlyAppointments = async (year: number) => {
    try {
      setLoading(true);
      // Chuyển year thành chuỗi
      const response = await apiChart.getAppointmentsYearly(year.toString());
      setYearlyData(response.data);
      console.log('datayear: ', response.data)

    } catch (err) {
      setError("Có lỗi khi tải dữ liệu theo năm");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    getMonthlyAppointments(currentYear, currentMonth);
    getYearlyAppointments(currentYear);
  }, []);

  const monthlyChartData = {
    labels: monthlyData.map(item => item._id),
    datasets: [
      {
        label: "Số lượng lịch hẹn theo tháng",
        data: monthlyData.map(item => item.count),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      }
    ]
  };

  const yearlyChartData = {
    labels: yearlyData.map(item => item._id),
    datasets: [
      {
        label: "Số lượng lịch hẹn theo năm",
        data: yearlyData.map(item => item.count),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
      }
    ]
  };

  return (
    <div>
      <h1 className={styles.title}>Over View</h1>
      {error && <p>{error}</p>}

      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ width: '48%', marginBottom: '20px' }}>
          <h2>Monthly Appointments</h2>
          {loading ? <p>Loading...</p> : (
            <div style={{ width: '100%' }}>
              <Line data={monthlyChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
            </div>
          )}
        </div>

        <div style={{ width: '48%', marginBottom: '20px' }}>
          <h2>Yearly Appointments</h2>
          {loading ? <p>Loading...</p> : (
            <div style={{ width: '100%' }}>
              <Line data={yearlyChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
