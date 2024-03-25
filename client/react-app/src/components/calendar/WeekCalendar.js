import React, {Fragment, useState, useCallback, useMemo, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalendarPopup from "./CalendarPopup";

export default function WeekCalendar({ localizer, duration, proposals, setProposals }) {

    const myEvents = proposals;
    const setEvents = setProposals;

    const [openedDate, setOpenedDate] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);

    const onDialogClose = () => {
        setOpenPopup(false);
    }

    const handleRemove = (date) => {
        const start = date.start;
        const end = date.end;
        const updatedEvents = myEvents.filter(event => event.start !== start || event.end !== end);
        setEvents(updatedEvents);
    }

    const handleSelectSlot = useCallback(
        ({ start, end }) => {
            if (start > Date.now()) {
                end = new Date(start.valueOf()+duration*60*1000);
                setEvents((prev) => [...prev, { start, end }]);
                console.log({ start, end })
            }
        },
        [setEvents]
    )

    const handleSelectEvent = useCallback(
        ({ start, end }) => {
            setOpenedDate({ start, end });
        },
        [myEvents, setEvents]
    )

    useEffect(() => {
        if (openedDate !== null) {
            setOpenPopup(true);
        }
    }, [openedDate]);

    const { defaultDate, scrollToTime, formats } = useMemo(
        () => ({
            defaultDate: Date.now(),
            scrollToTime: new Date(1970, 1, 1, 6),
            formats: {
                dayFormat: (date, culture, localizer) =>
                    localizer.format(date, 'ddd DD.MM', culture),
                timeGutterFormat: (date, culture, localizer) =>
                    localizer.format(date, 'HH:00', culture),
            },
        }),
        []
    )

    return (
        <Fragment>
            <div>
                <Calendar
                    defaultDate={defaultDate}
                    defaultView={Views.WEEK}
                    events={myEvents}
                    localizer={localizer}
                    onSelectEvent={handleSelectEvent}
                    onSelectSlot={handleSelectSlot}
                    selectable
                    scrollToTime={scrollToTime}
                    views={['week']}
                    timeslots={4}
                    step={15}
                    length={60}
                    min={new Date(0, 0, 0, 8, 0, 0)}
                    max={new Date(0, 0, 0, 22, 0, 0)}
                    style={{height: "600px", width: "100%"}}
                    formats={formats}
                    messages={
                        {
                            date: 'Date',
                            time: 'Time',
                            event: 'Event',
                            allDay: '',
                            week: 'Week',
                            work_week: 'Work Week',
                            day: 'Day',
                            month: 'Month',
                            previous: '< Back',
                            next: 'Next >',
                            yesterday: 'Yesterday',
                            tomorrow: 'Tomorrow',
                            today: 'Today',
                            agenda: 'Agenda',

                            noEventsInRange: 'There are no events in this range.',

                            showMore: total => `+${total} more`,
                        }
                    }
                />
                <CalendarPopup
                    date={openedDate}
                    open={openPopup}
                    onClose={onDialogClose}
                    handleRemove={handleRemove}
                />
            </div>
        </Fragment>
    )
}

WeekCalendar.propTypes = {
    localizer: PropTypes.instanceOf(DateLocalizer),
}