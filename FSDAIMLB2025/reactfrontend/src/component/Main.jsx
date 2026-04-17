import React from "react";
import { Link } from "react-router-dom";
function Main() {
  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center p-5 shadow-premium rounded-4 bg-white" style={{ maxWidth: '600px' }}>
        <h1 className="display-4 text-primary mb-3">Premium Store</h1>
        <p className="lead text-muted mb-4">
          Experience the next level of shopping with our curated collection of premium products. 
          Manage your account, track your orders, and explore the best deals.
        </p>
        <div className="d-grid gap-3 d-sm-flex justify-content-center">
          <Link to="/login" className="btn btn-primary px-5 py-3 shadow-sm">
            Login Now
          </Link>
          <Link to="/register" className="btn btn-outline-primary px-5 py-3">
            Join the Community
          </Link>
        </div>
        <div className="mt-5 pt-4 border-top">
          <p className="small text-secondary mb-0">
            Powered by Harshit Singh &middot; 2026
          </p>
        </div>
      </div>
    </div>
  );
}


export default Main;
