import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {PencilIcon} from '@heroicons/react/24/outline';
import { ITEMS_PER_PAGE } from "../../constants/jsonData.js";
import Pagination from "../../layout/Pagination"; 
import { updateOrderAsync,fetchAllOrdersAsync } from '../../redux/orderSlice';

export default function AdminOrders() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const {orders,totalOrders} = useSelector((state)=>state.order);
  const [editableOrderId, setEditableOrderId] = useState(-1);

  const handleEdit = (order) => setEditableOrderId(order.id);
  
 

  const handleOrderStatus = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handleOrderPaymentStatus = (e, order) => {
    const updatedOrder = { ...order, paymentStatus: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handlePage = (page) => setPage(page)

  const chooseColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-purple-200 text-purple-600';
      case 'dispatched':
        return 'bg-yellow-200 text-yellow-600';
      case 'delivered':
        return 'bg-green-200 text-green-600';
      case 'received':
        return 'bg-green-200 text-green-600';
      case 'cancelled':
        return 'bg-red-200 text-red-600';
      default:
        return 'bg-purple-200 text-purple-600';
    }
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ pagination }));
  }, [dispatch, page,]);

  return (
    <div className="overflow-x-auto">
      <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded p-3 sm:p-0">
            <table className="w-full block overflow-x-auto">

              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="p-3 w-[200px] min-w-[200px] text-start"> Order ID</th>
                  <th className="p-3 w-[180px] min-w-[180px] text-start">Items</th>
                  <th className="p-3 w-[150px] min-w-[150px] text-start">Total Amount</th>
                  <th className="py-3 px-0 text-center w-[300px] min-w-[300px]">Shipping Address</th>
                  <th className="py-3 px-0 text-center w-[150px] min-w-[150px]">Order Status</th>
                  <th className="py-3 px-0 text-center w-[150px] min-w-[150px]">Payment Method</th>
                  <th className="py-3 px-0 text-center w-[150px] min-w-[150px]">Payment Status</th>
                  <th className="p-3 text-start w-[150px] min-w-[150px]">Order Time</th>
                  <th className="p-3 text-start w-[150px] min-w-[150px]">Last Updated</th>
                  <th className="p-3 text-center w-[20px] min-w-[20px]">Actions</th>
                </tr>
              </thead>

              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">

                    <td className="p-3 text-left w-[200px] min-w-[200px]"><span className="font-medium">{order.id}</span></td>

                    <td className="p-3 text-left w-[180px] min-w-[180px]">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <span>
                            {item.product.title} - #{item.quantity} - ₹
                            {item.product.discountPrice}
                          </span>
                        </div>
                      ))}
                    </td>

                    <td className="p-3 text-center w-[150px] min-w-[150px]">₹{order.totalAmount}</td>
                    
                    <td className="p-3 text-center w-[300px] min-w-[300px]">
                      <div>
                        <div>
                          <strong>{order.selectedAddress.name}</strong>,
                        </div>
                        <div>{order.selectedAddress.street},</div>
                        <div>{order.selectedAddress.city}{", "}{order.selectedAddress.state}{", "}{order.selectedAddress.pinCode} </div>
                        <div>{order.selectedAddress.phone} </div>
                      </div>
                    </td>

                    <td className="p-3 text-center w-[150px] min-w-[150px]">
                      {order.id === editableOrderId ? (
                        <select value={order.status} onChange={(e) => handleOrderStatus(e, order)}>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span className={`${chooseColor(order.status)} py-1 px-3 rounded-full text-xs`} >{order.status}</span>
                      )}
                    </td>

                    <td className="p-3  text-center w-[150px] min-w-[150px]">
                      <div className="flex items-center justify-center">
                        {order.paymentMethod}
                      </div>
                    </td>

                    <td className="p-3 text-center w-[150px] min-w-[150px]">
                      {order.id === editableOrderId ? (
                        <select value={order.paymentStatus} onChange={(e) => handleOrderPaymentStatus(e, order)}>
                          <option value="pending">Pending</option>
                          <option value="received">Received</option>
                        </select>
                      ) : (
                        <span className={`${chooseColor(order.paymentStatus)} py-1 px-3 rounded-full text-xs`}> {order.paymentStatus}</span>
                      )}
                    </td>

                    <td className="py-3 px-0 text-center w-[150px] min-w-[150px]">
                        {order.createdAt? new Date(order.createdAt).toLocaleString():null }
                    </td>

                    <td className="py-3 px-0 text-center w-[150px] min-w-[150px]">
                      {order.updatedAt? new Date(order.updatedAt).toLocaleString():null}
                    </td>

                    <td className="py-3 px-0 text-center w-[20px] min-w-[20px]">
                      <div className="flex item-center justify-center">
                        <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                          <PencilIcon className="w-5 h-5 cursor-pointer" onClick={(e) => handleEdit(order)}/>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems={totalOrders}/>
    </div>
  )
};
