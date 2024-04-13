import { useAuth } from "../store/auth";

export const Service = () => {
    const {services} = useAuth();

    return (
        <section className="section-services">
            <div className="container">
                <h1 className="main-heading">Services</h1>
            </div>

            <div className="container grid grid-three-cols">
                {services.map((curElem, index) => {
                    //this is destructuring otherwise, we need to write curElem.price,...
                    const {description, price, provider, service} = curElem;
                    
                    //whenever we use map we need to use a index variable and pass it in the below line
                    return (
                        <div className="card" key={index}>
                            <div className="card-img">
                                <img 
                                    src="/images/design.png" 
                                    alt="My services" 
                                    width="200"
                                />
                            </div>

                            <div className="card-details">
                                <div className="grid grid-two-cols">
                                    <p>{provider}</p>
                                    <p>{price}</p>
                                </div>
                                <h2>{service}</h2>
                                <p>{description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};