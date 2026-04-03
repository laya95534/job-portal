import { useEffect, useState } from "react";
import axios from "axios";

function Jobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  // ➕ Add job form states
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");

  // ⭐ Applied jobs state
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }

    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res: any = await axios.get("http://localhost:5001/api/jobs");
    setJobs(res.data);
  };

  // ➕ Add Job
  const handleAddJob = async () => {
    if (!title || !company || !location) {
      alert("Fill all fields");
      return;
    }

    await axios.post("http://localhost:5001/api/jobs/add", {
      title,
      company,
      location,
    });

    alert("Job added ✅");

    setTitle("");
    setCompany("");
    setLocation("");

    fetchJobs();
  };

  // ⭐ Apply Job
  const handleApply = (id: string) => {
    if (!appliedJobs.includes(id)) {
      setAppliedJobs([...appliedJobs, id]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>💼 Job Search App</h2>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "10px", marginBottom: "20px" }}
      />

      {/* ➕ ADD JOB */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <br />
        <button onClick={handleAddJob}>Add Job</button>
      </div>

      {/* 💼 JOB LIST */}
      {jobs
        .filter((job: any) =>
          job.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((job: any) => (
          <div
            key={job._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px auto",
              padding: "15px",
              width: "300px",
              borderRadius: "8px",
            }}
          >
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>

            <button onClick={() => handleApply(job._id)}>
              {appliedJobs.includes(job._id) ? "Applied ✅" : "Apply"}
            </button>
          </div>
        ))}

      {/* ⭐ MY APPLICATIONS */}
      <h3>My Applications</h3>
      {jobs
        .filter((job: any) => appliedJobs.includes(job._id))
        .map((job: any) => (
          <div key={job._id}>
            <p>{job.title} - {job.company}</p>
          </div>
        ))}

      {/* 🔓 LOGOUT */}
      <button onClick={handleLogout} style={{ marginTop: "20px" }}>
        Logout
      </button>
    </div>
  );
}

export default Jobs;