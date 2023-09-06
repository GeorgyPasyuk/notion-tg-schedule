// @ts-ignore
import ICAL from 'ical.js'
export const parseICalData = async (iCalData: string)=> {
  const jcalData = ICAL.parse(iCalData);
  const comp = new ICAL.Component(jcalData);
  const vevents = comp.getAllSubcomponents("vevent");

  const events: any = [];

  vevents.forEach((vevent: any) => {
    const dtstart = new Date(vevent.getFirstPropertyValue("dtstart"));
    const dtend = new Date(vevent.getFirstPropertyValue("dtend"));
    const description = vevent.getFirstPropertyValue("description");

    const descriptionLines = description.split("\n");
    const name = descriptionLines[1] ? descriptionLines[1].trim() : "";

    const eventTypeMatch = description.match(
      /Лекции|Практические \(семинарские\) занятия/i,
    );
    const eventType = eventTypeMatch ? eventTypeMatch[0] : "";

    let color = eventType === "Лекции" ? "blue_background" : "red_background";

    if (eventType === "") {
      color = "yellow_background";
    }

    const eventObj = {
      dtstart: dtstart.toISOString(),
      dtend: dtend.toISOString(),
      uid: vevent.getFirstPropertyValue("uid"),
      summary: vevent.getFirstPropertyValue("summary"),
      location: vevent.getFirstPropertyValue("location"),
      description: description.replace(/DESCRIPTION:(.*?)\n/, ""),
      name: name,
      eventType: eventType,
      color: color,
    };
    events.push(eventObj);
  });

  return events;
};
