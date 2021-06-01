const getCases = async () => {

    const response = await fetch ('https://api.covid19api.com/summary');
    const cases = await response.json();

    return cases;

};

