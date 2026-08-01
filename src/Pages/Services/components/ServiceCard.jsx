import { Link } from "react-router-dom";

function ServiceCard({ service }) {
  return (
    <Link to={`/service/${service._id}`} className="service-card-link">
      <div className="service-card">

        <img
          src={
            service.image?.startsWith("http")
              ? service.image
              : `http://localhost:5000${service.image}`
          }
          alt={service.name}
        />

        <h3>
          {service.name}
        </h3>

        <p>
          {service.duration}
        </p>

        <div>
          <span className="old-price">
            ₹{service.oldPrice}
          </span>

          <span className="price">
            ₹{service.price}
          </span>

          <span>
            {service.discount}% OFF
          </span>
        </div>

        <p>
          ⭐ {service.rating} | {service.booked} booked
        </p>

        <button>
          Add
        </button>

      </div>
    </Link>
  );
}

export default ServiceCard;