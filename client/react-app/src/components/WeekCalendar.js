import React, { Fragment, useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function WeekCalendar({ localizer, duration, proposals, setProposals }) {
    //const [myEvents, setEvents] = useState([])

    const myEvents = proposals;
    const setEvents = setProposals;

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
            const updatedEvents = myEvents.filter(event => event !== { start, end });
            setEvents(updatedEvents);
        },
        [myEvents, setEvents]
    )

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
            </div>
        </Fragment>
    )
}

WeekCalendar.propTypes = {
    localizer: PropTypes.instanceOf(DateLocalizer),
}