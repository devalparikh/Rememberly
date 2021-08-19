import React, { useEffect, useState } from "react";
import "./Journal.css";
import JournalCard from "./JournalCard";
import MoodChart from "./MoodChart";
import Moods from "./Moods";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
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

  const [checkins, SetCheckins] = useState([]);
  const [startDate, setStartDate] = useState(
    moment(new Date()).subtract(5, "days")
  );
  const [endDate, setEndDate] = useState(moment(new Date()));
  const [FocusedInput, SetFocusedInput] = useState();

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
        SetCheckins(res.data);
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

  const displayCheckins = () => {
    if (checkins.length === 0) {
      return (
        <div className="title" style={{ color: "#646569" }}>
          Welcome! Create your first check-in.
        </div>
      );
    }

    let prevDate: Date;
    return checkins.map((curCheckins, index) => {
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

      return (
        <JournalCard
          // TODO: Replace with read data for cur card
          date={date}
          mood={mood}
          activities={activities}
          title={title}
          notes={notes}
          timeAndDate={timeAndDate}
        />
      );
    });
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
        {/* Mood Chart */}
        <MoodChart checkins={checkins}></MoodChart>

        <div className="title"></div>
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
          }}
          onFocusChange={(arg) => {
            // @ts-ignore
            SetFocusedInput(arg);
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
          <Button
            onClick={() => {
              setStartDate(moment(new Date()).subtract(1, "weeks"));
            }}
            variant="flat"
            className="btn-date"
          >
            Week
          </Button>
          <Button
            onClick={() => {
              setStartDate(moment(new Date()).subtract(1, "months"));
            }}
            variant="flat"
            className="btn-date"
          >
            Month
          </Button>
          <Button
            onClick={() => {
              setStartDate(moment(new Date()).subtract(1, "years"));
            }}
            variant="flat"
            className="btn-date"
          >
            Year
          </Button>
          <Button
            onClick={() => {
              setStartDate(moment(userCreatedAt));
            }}
            variant="flat"
            className="btn-date"
          >
            All Time
          </Button>
        </div>
        <Button href="/journal/create" variant="flat">
          Check-In
        </Button>
        {/* Iterate over cards from API */}
        {displayCheckins()}
      </div>
    </div>
  );
}
