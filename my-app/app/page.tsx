"use client";

import React from "react";

export default function Page() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const txt = await res.text();
      alert("Klaida siunčiant formą: " + txt);
      return;
    }

    alert("Žinutė išsiųsta!");
    form.reset();
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h2>Parašykite mums apie savo dieną</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Vardas
          <input name="name" required />
        </label>

        <br /><br />

        <label>
          El. paštas
          <input name="email" type="email" required />
        </label>

        <br /><br />

        <label>
          Žinutė
          <textarea name="message" required />
        </label>

        <br /><br />

        <button type="submit">Siųsti</button>
      </form>
    </div>
  );
}
