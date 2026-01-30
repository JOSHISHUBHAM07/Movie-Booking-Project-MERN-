import React, { useState, useEffect } from "react";
import { dummyBookingData } from "../../assets/assets";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";

const ListBooking = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$"; // Fallback to $ if env is missing
  const [booking, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch bookings
  const getAllBooking = async () => {
    try {
      // Simulating an API call delay
      setIsLoading(true);
      setBookings(dummyBookingData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger fetch on component mount
  useEffect(() => {
    getAllBooking();
  }, []);

  return (
    <div className="p-5">
      <Title text1="List" text2="Bookings" />

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="max-w-6xl mt-6 overflow-x-auto shadow-sm rounded-md">
          <table className="w-full border-collapse text-nowrap">
            <thead>
              <tr className="bg-primary/20 text-left">
                <th className="p-4 font-semibold pl-5">User Name</th>
                <th className="p-4 font-semibold">Movie Name</th>
                <th className="p-4 font-semibold">Show Time</th>
                <th className="p-4 font-semibold">Seats</th>
                <th className="p-4 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {booking.length > 0 ? (
                booking.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
                  >
                    <td className="p-4 pl-5 font-medium">{item.user.name}</td>
                    <td className="p-4">{item.show.movie.title}</td>
                    <td className="p-4">
                      {dateFormat(item.show.showDateTime)}
                    </td>
                    <td className="p-4">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {Object.values(item.bookedSeats).join(", ")}
                      </span>
                    </td>
                    <td className="p-4 font-semibold">
                      {currency} {item.amount}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListBooking;
