useEffect(() => {
  const fetchTherapists = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/therapists");
      setTherapists(response.data);
    } catch (error) {
      console.error("Error fetching therapists:", error);
    }
  };
  fetchTherapists();
}, []);