import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllOrders = createAsyncThunk(
  "admin/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return rejectWithValue(error.response?.data || { message: "Failed to fetch orders" });
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ id, newStatus }, { rejectWithValue }) => {
    try {
      console.log("Updating order:", id, "with status:", newStatus);
      
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
        { status: newStatus }, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "application/json"
          },
        }
      );
      console.log("Update response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating order status:", error);
      return rejectWithValue(error.response?.data || { message: "Failed to update order status" });
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "admin/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return id;
    } catch (error) {
      console.error("Error deleting order:", error);
      return rejectWithValue(error.response?.data || { message: "Failed to delete order" });
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null,
    updateLoading: false,
    updateError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;

        // Calculate total sales
        const totalSales = action.payload.reduce((acc, order) => {
          return acc + order.totalPrice;
        }, 0);
        state.totalSales = totalSales;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch orders";
      })
      
      // Update order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.updateLoading = false;
        
        let updatedOrder;
        if (action.payload.order) {
          updatedOrder = action.payload.order;
        } else if (action.payload._id) {
          updatedOrder = action.payload;
        } else {
          console.error("Unexpected response structure:", action.payload);
          return;
        }
        
        const orderIndex = state.orders.findIndex(
          (order) => order._id === updatedOrder._id
        );
        
        if (orderIndex !== -1) {
          console.log("Updating order in state:", updatedOrder);
          state.orders[orderIndex] = updatedOrder;
        } else {
          console.error("Order not found in state:", updatedOrder._id);
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload?.message || "Failed to update order status";
        console.error("Update rejected:", state.updateError);
      })
      
      // Delete order
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
        state.totalOrders = state.orders.length;
        
        // Recalculate total sales after deletion
        const totalSales = state.orders.reduce((acc, order) => {
          return acc + order.totalPrice;
        }, 0);
        state.totalSales = totalSales;
      });
  },
});

export default adminOrderSlice.reducer;