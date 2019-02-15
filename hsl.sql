--
-- PostgreSQL database dump
--

-- Dumped from database version 10.6 (Ubuntu 10.6-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.6 (Ubuntu 10.6-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: ticketLogs; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."ticketLogs" (
    id integer NOT NULL,
    "phoneNumber" character varying(255),
    "userId" character varying(255),
    "ticketTypeId" character varying(255),
    "customerTypeId" character varying(255),
    "regionId" character varying(255),
    "ticketId" character varying(1024),
    "validFrom" character varying(255),
    "validityPeriod" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ticketLogs" OWNER TO admin;

--
-- Name: ticketLogs_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."ticketLogs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ticketLogs_id_seq" OWNER TO admin;

--
-- Name: ticketLogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."ticketLogs_id_seq" OWNED BY public."ticketLogs".id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    password character varying(1024),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO admin;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO admin;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: ticketLogs id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."ticketLogs" ALTER COLUMN id SET DEFAULT nextval('public."ticketLogs_id_seq"'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: ticketLogs; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."ticketLogs" (id, "phoneNumber", "userId", "ticketTypeId", "customerTypeId", "regionId", "ticketId", "validFrom", "validityPeriod", "createdAt", "updatedAt") FROM stdin;
1	+358501231234	1	season	adult	helsinki	w9dQURvLfOXMvIAXSeJCLPROuy4T5J0hOQBdFJEPYPF004	2018-06-26T13:09:40.797Z	\N	2019-02-15 13:45:16.792+02	2019-02-15 13:45:16.792+02
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users (id, name, email, password, "createdAt", "updatedAt") FROM stdin;
1	dhiraj	dhiraj@koirala.com	$2b$10$wS/PWbSlT3XPOJiWsOZw1./6L.JymSURorFJLERW2CRagodCeY0.2	2019-02-15 13:38:28.003+02	2019-02-15 13:38:28.003+02
2	dhiraj	dhiraj1@koirala.com	$2b$10$1n23s98MDUGIpx6TFIP7pOscCoUls8gz5KdXVr/su61ecaI/y/i7K	2019-02-15 13:39:27.925+02	2019-02-15 13:39:27.925+02
\.


--
-- Name: ticketLogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."ticketLogs_id_seq"', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: ticketLogs ticketLogs_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."ticketLogs"
    ADD CONSTRAINT "ticketLogs_pkey" PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

