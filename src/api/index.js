import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_SERVER;

const API = axios.create({
  baseURL: BASE_URL,
});

// Auth
API.login = (data) => {
  return API.post("/api/admin/login", data);
};

API.sendOtp = (data) => {
  return API.post("/api/admin/resend_otp", data);
};

API.resetPassword = (data)=>{
  return API.post("/api/admin/reset_password",data)
}


API.changePassword = (data) => {
  return API.post("/api/admin/change_password", data)
}

// logout
API.logOut = (data)=>{
  return API.post("/api/admin/logout",data)
}

// Admin
API.adminProfile = ()=>{
  return API.get("/api/admin/me")
}

// policies

// privacy 

API.getPrivacy = ()=>{
  return API.get("/api/privacy_policy")
}

API.addPrivacy = (data)=>{
  return API.post("/api/privacy_policy", data)
}

// T&C

API.getTerms = ()=>{
  return API.get("/api/terms_and_conditions")
}

API.addTerms = (data)=>{
  return API.post("/api/terms_and_conditions", data)
}


// About App

API.getAbout = ()=>{
  return API.get("/api/about_app")
}

API.addAbout = (data)=>{
  return API.post("/api/about_app", data)
}



API.changeStatus = (data)=>{
  return API.patch("/api/business/block_business/admin", data)
}


// users
API.getUsers = () => {
  return API.get("/api/user");
};

API.userStatus = (data)=>{
  return API.patch("/api/user/block_user/admin", data)
}

// crowdFunding
API.getFunding = ()=>{
  return API.get(`/api/crowd_funding`)
}
// feeds
API.getFeeds = ()=>{
  return API.get("/api/feed/admin")
}

// Categories
API.getCategories = ()=>{
  return API.get("/api/service_category")
}
API.getServices = ()=>{
  return API.get("/api/service/admin")
}
API.getBusiness = ()=>{
  return API.get("/api/user/business/all")
}
API.addCategory = (data)=>{
  return API.post("/api/service_category",data)
}

API.editCategory = (data, param)=>{
  return API.patch(`/api/business_category/${param}`,data)
}

API.deleteCategory = (param)=>{
  return API.delete(`/api/business_category/${param}`)
}

// sales
API.getSales = (range)=>{
  return API.get(`/api/analytics?range=${range}`)
}

// orders
API.getOrder = (status)=>{
  return API.get(`/api/order/admin?order_status=${status}`)
}

// feedback
 
API.getFeedback = (param)=>{
  return API.get(`/api/help_and_feedback?sender_type=${param}`)
}

// sendNotification 

API.sendNoti = (param, data)=>{
  return API.post(`/api/send_notification_to_all?receiver_type=${param}`, data)
}

//wallet & transaction
API.getBalance = ()=>{
  return API.get(`/api/admin/wallet_balance`)
}

API.getTransactions =(param="COMPLETED")=>{
  return API.get(`/api/admin/wallet?booking_status=${param}`)
}

// life-priority
  API.getPriorities = ()=>{
    return API.get(`/api/life_priority`)
  }
  

  API.addPriority = (data)=>{
    return API.post(`/api/life_priority`,data)
  }

  API.editPriority = (param, data)=>{
    return API.patch(`/api/life_priority/${param}`,data)
  }
  API.deletePriority = (param)=>{
    return API.delete(`/api/life_priority/${param}`)
  }
// 
API.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token) {
    config.headers["Authorization"] = `${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(
      error?.response?.data?.error === "User session access has been removed"
    );
    if (
      error?.response?.data?.error === "User session access has been removed"
    ) {
      Cookies.remove("token");
    }
    return Promise.reject(error);
  }
);

export { API };
