const BASE_URL = "http://localhost:5000/complaints";

// GET — Read all complaints
export const getComplaints = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

// POST — Create new complaint
export const createComplaint = async (data) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

// PATCH — Update complaint (status / priority etc.)
export const updateComplaint = async (id, updatedData) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedData)
  });
  return res.json();
};

export const updateComplaintStatus = async (id, status) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  })

  return res.json()
}

// DELETE — Remove complaint
export const deleteComplaint = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });
};
