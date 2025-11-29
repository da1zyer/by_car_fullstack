export const createCar = async (fetcher, link) => {
    const response = await fetcher(`http://localhost:8000/car`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            url: link
        })
    });

    const data = await response.json();
    return data;
};

export const createCarManually = async (fetcher, title) => {
    const response = await fetcher(`http://localhost:8000/car`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            title: title
        })
    });

    const data = await response.json();
    return data;
};

export const getAllCars = async (fetcher) => {
    const response = await fetcher(`http://localhost:8000/car/get_all`, {
        method: "GET",
    });

    const data = await response.json();
    return data;
};

export const getCar = async (fetcher, id) => {
    const response = await fetcher(`http://localhost:8000/car/${id}`, {
        method: "GET",
    });

    const data = await response.json();
    return data;
};

export const deleteCar = async (fetcher, id) => {
    const response = await fetcher(`http://localhost:8000/car/${id}`, {
        method: "DELETE",
    });

    const data = await response.json();
    return data;
};

export const getImages = async (fetcher, id) => {
    const response = await fetcher(`http://localhost:8000/car/images/${id}`, {
        method: "GET",
    });

    const data = await response.json();
    return data;
};

export const createImage = async (fetcher, id, formData) => {
    const response = await fetcher(`http://localhost:8000/car/${id}`, {
        method: "POST",
        body: formData,
    });

    const data = await response.json();
    return data;
};