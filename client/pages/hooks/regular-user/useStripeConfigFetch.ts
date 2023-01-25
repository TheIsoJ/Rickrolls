import axios from "axios";
import { useState, useEffect } from "react";
import { GET_STRIPE_CONFIG_BASE_URL } from "../../../config";

const useStripeConfigFetch = () => {
    const [res, setRes] = useState<StripeConfigProps>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const fetchStripePublicKey = async () => {
        try {
            setLoading(true);
            setError(false);

            const stripeConfig = await axios.get<StripeConfigProps>(GET_STRIPE_CONFIG_BASE_URL);

            setRes(stripeConfig.data);
        } catch (error) {
            setError(true);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchStripePublicKey();
    }, []);

    return { res, loading, error };
};

export default useStripeConfigFetch