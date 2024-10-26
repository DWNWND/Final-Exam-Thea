export default function SelectTravelDates() {
  let today = new Date();

  let year = today.getFullYear();
  let month = today.getMonth() + 1; // the months are indexed starting with 0
  let date = today.getDate();

  let startDateStr = `${year}-${month}-${date}`;
  let endDateStr = `${year}-${month}-${date + 1}`;

  return (
    <div>
      <input type="date" id="start" name="startDate" min={startDateStr} value={startDateStr}></input>
      <input type="date" id="end" name="endDate" min={endDateStr} value={endDateStr}></input>
    </div>
  );
}
