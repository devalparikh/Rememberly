import React, { useEffect, useState } from "react";
import "./Journal.css";
import JournalCard from "./JournalCard";
import MoodChart from "./MoodChart";
import Moods from "./Moods";
import axios from "axios";
import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { create } from "domain";
import { DateRangePicker } from "react-dates";
import moment from "moment";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

interface Props {
  name: string;
  user_id: string;
  userCreatedAt: Date;
}

export function Journal(props: Props) {
  const { name, userCreatedAt } = props;

  const [checkins, setCheckins] = useState([]);
  const [startDate, setStartDate] = useState(
    moment(new Date()).subtract(1, "weeks")
  );
  const [endDate, setEndDate] = useState(moment(new Date()));
  const [FocusedInput, setFocusedInput] = useState();

  const [selectedTimeUnit, setSelectedTimeUnit] = useState("weeks");

  const [search, setSearch] = useState("");

  useEffect(() => {
    // Refresh when coming from creating a new checkin
    if (String(document.referrer).includes("confirm")) {
      // @ts-ignore
      window.location = window.location.href;
    }

    if (!startDate || !endDate) return;

    const start = startDate.toDate();
    const end = endDate.toDate();

    axios
      .get(`${process.env.REACT_APP_URL}/checkin/${start}/${end}`, {
        headers: { "x-auth-token": `${localStorage.usertoken}` },
      })
      .then((res) => {
        console.log('recieved checkins from db')
        setCheckins(res.data);
      })
      .catch((err) => {
        // TODO: add error handling
        // TODO: remove usertoken before allowing a new checkin if 401 error (not 400)
        if (err && err.response && err.response.status === 400) {
          console.log("invalid token");
          localStorage.removeItem("usertoken");
          // @ts-ignore
          window.location = "/login";
        }
        if (err && err.response && err.response.data) {
          console.log(err.response.data.msg);
        } else {
          // localStorage.removeItem("usertoken");
          // // @ts-ignore
          // window.location = '/login';
        }
      });
  }, [startDate, endDate]);

  const getCheckins = () => {
    let prevDate: Date;
    console.log("fetching and searching checkins");
    return checkins
      .filter((curCheckins) => {
        // Search filtering
        const { createdAt, mood, activities, title, notes } = curCheckins;
        let isSearchedFor = true;
        if (search) {
          const createdAtString = String(createdAt).toLowerCase();
          const titleString = String(title).toLowerCase();
          const notesString = String(notes).toLowerCase();
          isSearchedFor = [
            createdAtString,
            titleString,
            notesString,
            ...activities,
          ]
            .join("")
            .includes(search);
        }
        return isSearchedFor;
      })
      .map((curCheckins) => {
        const { createdAt, mood, activities, title, notes } = curCheckins;

        let timeAndDate = true;
        let date = new Date(createdAt);
        if (
          prevDate &&
          prevDate.toLocaleDateString() ===
            new Date(createdAt).toLocaleDateString()
        ) {
          timeAndDate = false;
        }
        prevDate = date;

        return { date, mood, activities, title, notes, timeAndDate };
      });
  };

  const displayCheckins = (checkins: any) => {
    if (checkins.length > 0) {
      return checkins.map((curCheckins: any, index: number) => {
        const { date, mood, activities, title, notes, timeAndDate } =
          curCheckins;
        return (
          <JournalCard
            date={date}
            mood={mood}
            activities={activities}
            title={title}
            notes={notes}
            timeAndDate={timeAndDate}
            key={index}
          />
        );
      });
    } else {
      return (
        <div className="title" style={{ color: "#646569" }}>
          No Check-ins found
        </div>
      );
    }
  };

  const handleDateFilterButtons = (timeUnit?: any) => {
    if (timeUnit) {
      setStartDate(moment(new Date()).subtract(1, timeUnit));
      setSelectedTimeUnit(timeUnit);
    } else {
      setStartDate(moment(userCreatedAt));
      setSelectedTimeUnit("allTime");
    }
  };

  return (
    <div>
      <div className="dark">
        <Container>
          <Row>
            <Col>
              <div className="title">{name}'s Journal</div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="journal-card-group">
        <Button href="/journal/create" variant="flat btn-checkin">
          + Check-In
        </Button>

        {/* Mood Chart */}
        <MoodChart checkins={checkins} />

        {/* Calander date picker for chart and cards */}
        <div className="date-journal-card">Select Date Range</div>
        <DateRangePicker
          startDate={moment(startDate)}
          startDateId="startDateId"
          endDate={moment(endDate)}
          endDateId="endDateId"
          focusedInput={FocusedInput || null}
          onDatesChange={({ endDate, startDate }) => {
            // @ts-ignore
            setEndDate(endDate);
            // @ts-ignore
            setStartDate(startDate);
            setSelectedTimeUnit("");
          }}
          onFocusChange={(arg) => {
            // @ts-ignore
            setFocusedInput(arg);
          }}
          orientation="vertical"
          minDate={moment(userCreatedAt)}
          isOutsideRange={(day) => {
            if (
              day.isSameOrAfter(moment(userCreatedAt)) &&
              day.isSameOrBefore(moment(new Date()).add(1, "days"))
            ) {
              return false;
            }
            return true;
          }}
          readOnly
        />
        <div>
          <ButtonGroup>
            <Button
              onClick={() => {
                handleDateFilterButtons("weeks");
              }}
              variant="flat"
              className={`btn-date ${
                selectedTimeUnit === "weeks" && "selected"
              }`}
            >
              Week
            </Button>
            <Button
              onClick={() => {
                handleDateFilterButtons("months");
              }}
              variant="flat"
              className={`btn-date ${
                selectedTimeUnit === "months" && "selected"
              }`}
            >
              Month
            </Button>
            <Button
              onClick={() => {
                handleDateFilterButtons("years");
              }}
              variant="flat"
              className={`btn-date ${
                selectedTimeUnit === "years" && "selected"
              }`}
            >
              Year
            </Button>
            <Button
              onClick={() => {
                handleDateFilterButtons();
              }}
              variant="flat"
              className={`btn-date ${
                selectedTimeUnit === "allTime" && "selected"
              }`}
            >
              All Time
            </Button>
          </ButtonGroup>
        </div>

        <div className="date-journal-card">Search & Filter ()</div>
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="search-box"
          placeholder="Search..."
        ></input>

        {/* Iterate over cards from API */}
        {displayCheckins(getCheckins())}
        {}
      </div>
    </div>
  );
}
