document.addEventListener("DOMContentLoaded", () => {
  const switcher = document.querySelector(".week-switcher");
  const track = document.querySelector(".schedule-track");
  const indicator = document.querySelector(".week-switcher-indicator");
  const tabs = Array.from(document.querySelectorAll(".week-tab"));
  const weeks = Array.from(document.querySelectorAll(".schedule-week"));

  if (!switcher || !track || !indicator || tabs.length === 0 || weeks.length === 0) return;

  const activateWeek = (index, moveFocus = false) => {
    const safeIndex = Math.max(0, Math.min(index, tabs.length - 1));

    track.style.transform = `translateX(-${safeIndex * 100}%)`;
    indicator.style.transform = `translateX(${safeIndex * 100}%)`;

    tabs.forEach((tab, i) => {
      const active = i === safeIndex;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    weeks.forEach((week, i) => {
      const active = i === safeIndex;
      week.classList.toggle("is-active", active);
      week.setAttribute("aria-hidden", String(!active));
    });

    if (moveFocus) tabs[safeIndex].focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateWeek(index));

    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = tabs.length - 1;
      else return;

      event.preventDefault();
      activateWeek(nextIndex, true);
    });
  });

  activateWeek(0);
});
