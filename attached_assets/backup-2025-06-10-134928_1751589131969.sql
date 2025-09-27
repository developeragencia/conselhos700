--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9
-- Dumped by pg_dump version 16.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: analytics; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.analytics (
    id integer NOT NULL,
    date timestamp without time zone NOT NULL,
    total_users integer DEFAULT 0,
    total_orders integer DEFAULT 0,
    total_revenue numeric(12,2) DEFAULT 0,
    new_users integer DEFAULT 0
);


ALTER TABLE public.analytics OWNER TO neondb_owner;

--
-- Name: analytics_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.analytics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.analytics_id_seq OWNER TO neondb_owner;

--
-- Name: analytics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.analytics_id_seq OWNED BY public.analytics.id;


--
-- Name: banner_slides; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.banner_slides (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    subtitle character varying(255),
    description text,
    image_url character varying(500),
    button_text character varying(100),
    button_link character varying(255),
    text_position character varying(20) DEFAULT 'center'::character varying,
    text_alignment character varying(20) DEFAULT 'center'::character varying,
    title_color character varying(50) DEFAULT '#FFFFFF'::character varying,
    subtitle_color character varying(50) DEFAULT '#FFFFFF'::character varying,
    description_color character varying(50) DEFAULT '#FFFFFF'::character varying,
    background_overlay character varying(50) DEFAULT 'rgba(0,0,0,0.4)'::character varying,
    button_style character varying(20) DEFAULT 'primary'::character varying,
    button_position character varying(20) DEFAULT 'center'::character varying,
    auto_rotate_seconds integer DEFAULT 5,
    is_active boolean DEFAULT true,
    "order" integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.banner_slides OWNER TO neondb_owner;

--
-- Name: banner_slides_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.banner_slides_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.banner_slides_id_seq OWNER TO neondb_owner;

--
-- Name: banner_slides_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.banner_slides_id_seq OWNED BY public.banner_slides.id;


--
-- Name: blog_posts; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.blog_posts (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    slug character varying(255),
    excerpt text,
    content text,
    image_url character varying(500),
    category character varying(100),
    published_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    published boolean DEFAULT true,
    featured boolean DEFAULT false
);


ALTER TABLE public.blog_posts OWNER TO neondb_owner;

--
-- Name: blog_posts_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.blog_posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.blog_posts_id_seq OWNER TO neondb_owner;

--
-- Name: blog_posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.blog_posts_id_seq OWNED BY public.blog_posts.id;


--
-- Name: consultant_availability; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.consultant_availability (
    id integer NOT NULL,
    consultant_id integer,
    day_of_week integer NOT NULL,
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.consultant_availability OWNER TO neondb_owner;

--
-- Name: consultant_availability_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.consultant_availability_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.consultant_availability_id_seq OWNER TO neondb_owner;

--
-- Name: consultant_availability_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.consultant_availability_id_seq OWNED BY public.consultant_availability.id;


--
-- Name: consultants; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.consultants (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    title character varying(255),
    description text,
    price_per_minute numeric(10,2),
    rating numeric(3,2) DEFAULT 0,
    review_count integer DEFAULT 0,
    image_url character varying(500),
    whatsapp character varying(20),
    specialty character varying(100),
    is_active boolean DEFAULT true,
    status character varying(20) DEFAULT 'offline'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.consultants OWNER TO neondb_owner;

--
-- Name: consultants_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.consultants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.consultants_id_seq OWNER TO neondb_owner;

--
-- Name: consultants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.consultants_id_seq OWNED BY public.consultants.id;


--
-- Name: consultation_messages; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.consultation_messages (
    id integer NOT NULL,
    session_id integer,
    sender_id integer,
    sender_type character varying(20) NOT NULL,
    message_type character varying(20) DEFAULT 'text'::character varying,
    content text NOT NULL,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_read boolean DEFAULT false
);


ALTER TABLE public.consultation_messages OWNER TO neondb_owner;

--
-- Name: consultation_messages_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.consultation_messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.consultation_messages_id_seq OWNER TO neondb_owner;

--
-- Name: consultation_messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.consultation_messages_id_seq OWNED BY public.consultation_messages.id;


--
-- Name: consultation_rooms; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.consultation_rooms (
    id integer NOT NULL,
    room_id character varying NOT NULL,
    consultation_id integer,
    client_id integer NOT NULL,
    consultant_id integer NOT NULL,
    room_type character varying NOT NULL,
    is_active boolean DEFAULT true,
    started_at timestamp without time zone,
    ended_at timestamp without time zone,
    credits_per_minute numeric(10,2),
    total_credits_used numeric(10,2) DEFAULT 0.00,
    connection_status character varying DEFAULT 'disconnected'::character varying,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.consultation_rooms OWNER TO neondb_owner;

--
-- Name: consultation_rooms_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.consultation_rooms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.consultation_rooms_id_seq OWNER TO neondb_owner;

--
-- Name: consultation_rooms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.consultation_rooms_id_seq OWNED BY public.consultation_rooms.id;


--
-- Name: consultation_sessions; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.consultation_sessions (
    id integer NOT NULL,
    client_id character varying(255),
    consultant_id integer,
    service_type character varying(50) NOT NULL,
    status character varying(20) DEFAULT 'pending'::character varying,
    scheduled_at timestamp without time zone,
    started_at timestamp without time zone,
    ended_at timestamp without time zone,
    duration_minutes integer,
    price_paid numeric(10,2),
    payment_status character varying(20) DEFAULT 'pending'::character varying,
    room_id character varying(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    credits_used numeric(10,2) DEFAULT 0.00,
    rating integer,
    feedback text,
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.consultation_sessions OWNER TO neondb_owner;

--
-- Name: consultation_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.consultation_sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.consultation_sessions_id_seq OWNER TO neondb_owner;

--
-- Name: consultation_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.consultation_sessions_id_seq OWNED BY public.consultation_sessions.id;


--
-- Name: credit_packages; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.credit_packages (
    id integer NOT NULL,
    name character varying NOT NULL,
    amount integer NOT NULL,
    price numeric(10,2) NOT NULL,
    original_price numeric(10,2),
    bonus integer DEFAULT 0,
    valid_days integer DEFAULT 90,
    features text[],
    is_popular boolean DEFAULT false,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.credit_packages OWNER TO neondb_owner;

--
-- Name: credit_packages_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.credit_packages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.credit_packages_id_seq OWNER TO neondb_owner;

--
-- Name: credit_packages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.credit_packages_id_seq OWNED BY public.credit_packages.id;


--
-- Name: credit_transactions; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.credit_transactions (
    id integer NOT NULL,
    user_id integer,
    transaction_type character varying(20) NOT NULL,
    amount numeric(10,2) NOT NULL,
    description text,
    consultation_session_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.credit_transactions OWNER TO neondb_owner;

--
-- Name: credit_transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.credit_transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.credit_transactions_id_seq OWNER TO neondb_owner;

--
-- Name: credit_transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.credit_transactions_id_seq OWNED BY public.credit_transactions.id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    user_id integer,
    title character varying(255) NOT NULL,
    message text NOT NULL,
    type character varying(50) DEFAULT 'info'::character varying,
    is_read boolean DEFAULT false,
    action_url character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.notifications OWNER TO neondb_owner;

--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notifications_id_seq OWNER TO neondb_owner;

--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    order_id integer,
    product_id integer,
    quantity integer NOT NULL,
    unit_price numeric(10,2) NOT NULL
);


ALTER TABLE public.order_items OWNER TO neondb_owner;

--
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_items_id_seq OWNER TO neondb_owner;

--
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer,
    total_amount numeric(10,2) NOT NULL,
    status character varying(50) DEFAULT 'pending'::character varying,
    order_date timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.orders OWNER TO neondb_owner;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO neondb_owner;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    category character varying(100),
    stock_quantity integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.products OWNER TO neondb_owner;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO neondb_owner;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: service_categories; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.service_categories (
    id integer NOT NULL,
    name character varying NOT NULL,
    slug character varying NOT NULL,
    description text,
    image_url character varying,
    icon_name character varying,
    color character varying DEFAULT '#6366f1'::character varying,
    price_range character varying,
    is_active boolean DEFAULT true,
    order_position integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.service_categories OWNER TO neondb_owner;

--
-- Name: service_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.service_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.service_categories_id_seq OWNER TO neondb_owner;

--
-- Name: service_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.service_categories_id_seq OWNED BY public.service_categories.id;


--
-- Name: services; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.services (
    id integer NOT NULL,
    name character varying NOT NULL,
    description text,
    category character varying NOT NULL,
    base_price numeric(10,2),
    duration integer,
    image_url character varying,
    icon_name character varying,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.services OWNER TO neondb_owner;

--
-- Name: services_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.services_id_seq OWNER TO neondb_owner;

--
-- Name: services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.services_id_seq OWNED BY public.services.id;


--
-- Name: testimonials; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.testimonials (
    id integer NOT NULL,
    content text NOT NULL,
    author_name character varying(255) NOT NULL,
    author_location character varying(255),
    author_image_url character varying(500),
    rating integer DEFAULT 5,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.testimonials OWNER TO neondb_owner;

--
-- Name: testimonials_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.testimonials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.testimonials_id_seq OWNER TO neondb_owner;

--
-- Name: testimonials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.testimonials_id_seq OWNED BY public.testimonials.id;


--
-- Name: user_credits; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.user_credits (
    id integer NOT NULL,
    user_id character varying(255),
    credits_balance numeric(10,2) DEFAULT 0,
    total_purchased numeric(10,2) DEFAULT 0,
    total_used numeric(10,2) DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    total_credits numeric(10,2) DEFAULT 0.00,
    used_credits numeric(10,2) DEFAULT 0.00,
    bonus_credits numeric(10,2) DEFAULT 0.00,
    last_purchase_at timestamp without time zone
);


ALTER TABLE public.user_credits OWNER TO neondb_owner;

--
-- Name: user_credits_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.user_credits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_credits_id_seq OWNER TO neondb_owner;

--
-- Name: user_credits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.user_credits_id_seq OWNED BY public.user_credits.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255),
    email character varying(255) NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    password character varying(255),
    cpf character varying(11),
    phone character varying(20),
    credits numeric(10,2) DEFAULT 0.00,
    bonus_credits numeric(10,2) DEFAULT 0.00,
    has_received_bonus boolean DEFAULT false,
    first_purchase_completed boolean DEFAULT false,
    role character varying DEFAULT 'cliente'::character varying,
    is_active boolean DEFAULT true,
    profile_image_url character varying
);


ALTER TABLE public.users OWNER TO neondb_owner;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO neondb_owner;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: analytics id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.analytics ALTER COLUMN id SET DEFAULT nextval('public.analytics_id_seq'::regclass);


--
-- Name: banner_slides id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.banner_slides ALTER COLUMN id SET DEFAULT nextval('public.banner_slides_id_seq'::regclass);


--
-- Name: blog_posts id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.blog_posts ALTER COLUMN id SET DEFAULT nextval('public.blog_posts_id_seq'::regclass);


--
-- Name: consultant_availability id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.consultant_availability ALTER COLUMN id SET DEFAULT nextval('public.consultant_availability_id_seq'::regclass);


--
-- Name: consultants id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.consultants ALTER COLUMN id SET DEFAULT nextval('public.consultants_id_seq'::regclass);


--
-- Name: consultation_messages id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.consultation_messages ALTER COLUMN id SET DEFAULT nextval('public.consultation_messages_id_seq'::regclass);


--
-- Name: consultation_rooms id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.consultation_rooms ALTER COLUMN id SET DEFAULT nextval('public.consultation_rooms_id_seq'::regclass);


--
-- Name: consultation_sessions id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.consultation_sessions ALTER COLUMN id SET DEFAULT nextval('public.consultation_sessions_id_seq'::regclass);


--
-- Name: credit_packages id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.credit_packages ALTER COLUMN id SET DEFAULT nextval('public.credit_packages_id_seq'::regclass);


--
-- Name: credit_transactions id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.credit_transactions ALTER COLUMN id SET DEFAULT nextval('public.credit_transactions_id_seq'::regclass);


--
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: service_categories id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.service_categories ALTER COLUMN id SET DEFAULT nextval('public.service_categories_id_seq'::regclass);


--
-- Name: services id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.services ALTER COLUMN id SET DEFAULT nextval('public.services_id_seq'::regclass);


--
-- Name: testimonials id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.testimonials ALTER COLUMN id SET DEFAULT nextval('public.testimonials_id_seq'::regclass);


--
-- Name: user_credits id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_credits ALTER COLUMN id SET DEFAULT nextval('public.user_credits_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: analytics; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.analytics (id, date, total_users, total_orders, total_revenue, new_users) FROM stdin;
1	2025-06-08 00:00:00	16	25	19719.69	0
2	2025-06-07 00:00:00	16	25	19719.69	0
3	2025-06-06 00:00:00	16	25	19719.69	0
4	2025-06-05 00:00:00	16	25	19719.69	0
5	2025-06-04 00:00:00	16	25	19719.69	0
6	2025-06-03 00:00:00	16	25	19719.69	0
7	2025-06-02 00:00:00	16	25	19719.69	0
8	2025-06-01 00:00:00	16	25	19719.69	0
9	2025-05-31 00:00:00	16	25	19719.69	0
10	2025-05-30 00:00:00	16	25	19719.69	0
11	2025-05-29 00:00:00	16	25	19719.69	0
12	2025-05-28 00:00:00	16	25	19719.69	0
13	2025-05-27 00:00:00	16	25	19719.69	0
14	2025-05-26 00:00:00	16	25	19719.69	0
15	2025-05-25 00:00:00	16	25	19719.69	0
16	2025-05-24 00:00:00	16	25	19719.69	0
17	2025-05-23 00:00:00	16	25	19719.69	0
18	2025-05-22 00:00:00	16	25	19719.69	0
19	2025-05-21 00:00:00	16	25	19719.69	0
20	2025-05-20 00:00:00	16	25	19719.69	0
21	2025-05-19 00:00:00	16	25	19719.69	0
22	2025-05-18 00:00:00	16	25	19719.69	0
23	2025-05-17 00:00:00	16	25	19719.69	0
24	2025-05-16 00:00:00	16	25	19719.69	0
25	2025-05-15 00:00:00	16	25	19719.69	0
26	2025-05-14 00:00:00	16	25	19719.69	0
27	2025-05-13 00:00:00	16	25	19719.69	0
28	2025-05-12 00:00:00	16	25	19719.69	0
29	2025-05-11 00:00:00	16	25	19719.69	0
30	2025-05-10 00:00:00	16	25	19719.69	0
\.


--
-- Data for Name: banner_slides; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.banner_slides (id, title, subtitle, description, image_url, button_text, button_link, text_position, text_alignment, title_color, subtitle_color, description_color, background_overlay, button_style, button_position, auto_rotate_seconds, is_active, "order", created_at) FROM stdin;
1	Transforme Sua Vida com Orientação Espiritual	Consultores Especialistas Online 24h	Conecte-se com nossos médiuns, tarólogos e astrólogos certificados para receber orientações precisas sobre amor, carreira e espiritualidade	https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200	Consultar Agora	/consultores	center	center	#FFFFFF	#F3E8FF	#E5E7EB	rgba(0,0,0,0.4)	primary	center	8	t	1	2025-06-06 15:13:18.855691
2	Primeira Consulta com 50% de Desconto	Oferta Especial para Novos Clientes	Descubra o poder da orientação espiritual com consultores experientes. Tarot, astrologia, numerologia e muito mais	https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200	Aproveitar Oferta	/comprar/creditos	left	left	#FFFFFF	#FEF3C7	#E5E7EB	rgba(147,51,234,0.6)	secondary	left	8	t	2	2025-06-06 15:13:18.855691
3	Tarot Grátis - Revele Seu Futuro	Leitura Completa de 3 Cartas	Receba uma leitura gratuita do Tarot Rider-Waite e descubra as energias que influenciam sua vida neste momento	https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200	Jogar Tarot Grátis	/tarot-gratis	right	right	#FFFFFF	#FECACA	#E5E7EB	rgba(239,68,68,0.5)	accent	right	8	t	3	2025-06-06 15:13:18.855691
\.


--
-- Data for Name: blog_posts; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.blog_posts (id, title, slug, excerpt, content, image_url, category, published_at, created_at, published, featured) FROM stdin;
1	Os Segredos do Tarot Rider-Waite: Um Guia Completo	segredos-tarot-rider-waite-guia-completo	Descubra os significados profundos das 78 cartas do Tarot Rider-Waite e como fazer leituras precisas para transformar sua vida.	O Tarot Rider-Waite é um dos sistemas mais poderosos de adivinhação e autoconhecimento disponíveis hoje. Criado por Arthur Edward Waite e ilustrado por Pamela Colman Smith no início do século XX, este baralho revolucionou a forma como interpretamos as cartas...	https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400	tarot	2025-06-06 15:12:08.332465	2025-06-06 15:12:08.332465	t	t
2	Astrologia 2024: Previsões e Tendências dos Signos	astrologia-2024-previsoes-tendencias-signos	Análise completa das influências astrológicas de 2024 para todos os signos do zodíaco com orientações práticas.	O ano de 2024 traz transformações significativas no panorama astrológico. Com Plutão entrando definitivamente em Aquário, veremos mudanças revolucionárias em todos os aspectos da sociedade...	https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400	astrologia	2025-06-06 15:12:08.332465	2025-06-06 15:12:08.332465	t	f
3	Numerologia: Como Calcular Seu Número da Sorte	numerologia-calcular-numero-sorte	Aprenda os métodos tradicionais da numerologia para descobrir seu número pessoal e suas influências na vida.	A numerologia é uma ciência milenar que revela os padrões ocultos que governam nossa existência através dos números...	https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400	numerologia	2025-06-06 15:12:08.332465	2025-06-06 15:12:08.332465	t	f
4	Cristaloterapia: O Poder Curativo dos Cristais	cristaloterapia-poder-curativo-cristais	Explore as propriedades energéticas dos cristais e como utilizá-los para equilibrar chakras e harmonizar energias.	Os cristais possuem frequências vibracionais únicas que podem ser utilizadas para cura e harmonização energética...	https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400	cristais	2025-06-06 15:12:08.332465	2025-06-06 15:12:08.332465	t	f
\.


--
-- Data for Name: consultant_availability; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.consultant_availability (id, consultant_id, day_of_week, start_time, end_time, is_active, created_at) FROM stdin;
\.


--
-- Data for Name: consultants; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.consultants (id, name, title, description, price_per_minute, rating, review_count, image_url, whatsapp, specialty, is_active, status, created_at, updated_at) FROM stdin;
1	Maria Helena Santos	Tarotista e Vidente Especialista	Mais de 20 anos de experiência em leitura de tarot e orientação espiritual. Especialista em amor, trabalho e família.	3.50	4.90	127	/images/consultores/maria-helena.jpg	+5511987654321	Tarot	t	online	2025-06-06 12:53:57.297489	2025-06-06 12:53:57.297489
2	Carlos Eduardo Silva	Astrólogo Profissional	Astrólogo formado com especialização em mapa astral e trânsitos planetários. Consultas precisas e detalhadas.	4.20	4.80	89	/images/consultores/carlos-eduardo.jpg	+5511876543210	Astrologia	t	online	2025-06-06 12:53:57.297489	2025-06-06 12:53:57.297489
3	Ana Beatriz Oliveira	Médium e Terapeuta Holística	Médium com dom natural para comunicação espiritual. Também atua como terapeuta holística e reikiana.	3.80	4.90	156	/images/consultores/ana-beatriz.jpg	+5511765432109	Mediunidade	t	online	2025-06-06 12:53:57.297489	2025-06-06 12:53:57.297489
4	José Roberto Lima	Numerólogo e Coach Espiritual	Especialista em numerologia cabalística e pitagórica. Coach espiritual com foco em propósito de vida.	3.20	4.70	93	/images/consultores/jose-roberto.jpg	+5511654321098	Numerologia	t	busy	2025-06-06 12:53:57.297489	2025-06-06 12:53:57.297489
5	Fernanda Costa	Taróloga e Especialista em Amor	Especialista em consultas de relacionamento e amor. Utiliza tarot cigano e cartas do amor.	3.60	4.80	142	/images/consultores/fernanda-costa.jpg	+5511543210987	Tarot	t	online	2025-06-06 12:53:57.297489	2025-06-06 12:53:57.297489
6	Ricardo Mendes	Astrólogo e Quiromante	Astrólogo com 15 anos de experiência. Também realiza leitura de mãos e orientação sobre carreira.	4.00	4.60	78	/images/consultores/ricardo-mendes.jpg	+5511432109876	Astrologia	t	offline	2025-06-06 12:53:57.297489	2025-06-06 12:53:57.297489
7	Luciana Barbosa	Terapeuta de Cristais	Especialista em cristaloterapia e cura energética. Utiliza cristais para harmonização dos chakras.	3.40	4.90	104	/images/consultores/luciana-barbosa.jpg	+5511321098765	Cristaloterapia	t	online	2025-06-06 12:53:57.297489	2025-06-06 12:53:57.297489
8	Marcos Antônio	Runílogo e Vidente	Especialista em runas nórdicas e oráculos antigos. Vidente com grande sensibilidade espiritual.	3.30	4.70	67	/images/consultores/marcos-antonio.jpg	+5511210987654	Runas	t	online	2025-06-06 12:53:57.297489	2025-06-06 12:53:57.297489
\.


--
-- Data for Name: consultation_messages; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.consultation_messages (id, session_id, sender_id, sender_type, message_type, content, "timestamp", is_read) FROM stdin;
1	1	16	client	text	Olá, gostaria de saber sobre meu futuro amoroso	2025-06-08 17:07:53.445729	t
2	1	1	consultant	text	Olá! Vou puxar as cartas para você. Um momento...	2025-06-08 17:09:53.445729	t
3	1	1	consultant	text	Vejo uma energia muito positiva ao seu redor. Há alguém especial chegando em sua vida em breve.	2025-06-08 17:12:53.445729	t
4	2	16	client	text	Preciso entender meu mapa astral	2025-06-08 18:37:53.445729	t
5	2	2	consultant	text	Perfeito! Vou analisar seu mapa completo. Qual sua data, hora e local de nascimento?	2025-06-08 18:42:53.445729	t
\.


--
-- Data for Name: consultation_rooms; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.consultation_rooms (id, room_id, consultation_id, client_id, consultant_id, room_type, is_active, started_at, ended_at, credits_per_minute, total_credits_used, connection_status, created_at) FROM stdin;
1	room_001_active	\N	16	1	chat	t	2025-06-08 18:59:12.540362	\N	3.50	52.50	active	2025-06-08 19:14:12.540362
2	room_002_active	\N	15	2	video	t	2025-06-08 19:06:12.540362	\N	4.00	32.00	active	2025-06-08 19:14:12.540362
3	room_003_completed	\N	14	3	chat	f	2025-06-08 17:14:12.540362	2025-06-08 17:44:12.540362	3.00	90.00	completed	2025-06-08 19:14:12.540362
4	room_004_completed	\N	13	1	video	f	2025-06-07 19:14:12.540362	2025-06-07 19:44:12.540362	4.50	135.00	completed	2025-06-08 19:14:12.540362
5	room_005_completed	\N	12	4	chat	f	2025-06-05 19:14:12.540362	2025-06-05 19:44:12.540362	3.25	65.00	completed	2025-06-08 19:14:12.540362
\.


--
-- Data for Name: consultation_sessions; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.consultation_sessions (id, client_id, consultant_id, service_type, status, scheduled_at, started_at, ended_at, duration_minutes, price_paid, payment_status, room_id, created_at, credits_used, rating, feedback, updated_at) FROM stdin;
1	16	1	tarot	completed	2025-06-08 17:07:53.445729	\N	\N	\N	45.00	paid	room_001	2025-06-08 19:07:53.445729	0.00	\N	\N	2025-06-09 11:42:12.389739
2	16	2	astrologia	active	2025-06-08 18:37:53.445729	\N	\N	\N	60.00	paid	room_002	2025-06-08 19:07:53.445729	0.00	\N	\N	2025-06-09 11:42:12.389739
3	15	3	numerologia	scheduled	2025-06-08 20:07:53.445729	\N	\N	\N	30.00	pending	room_003	2025-06-08 19:07:53.445729	0.00	\N	\N	2025-06-09 11:42:12.389739
4	14	1	mediunidade	completed	2025-06-07 19:07:53.445729	\N	\N	\N	80.00	paid	room_004	2025-06-08 19:07:53.445729	0.00	\N	\N	2025-06-09 11:42:12.389739
\.


--
-- Data for Name: credit_packages; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.credit_packages (id, name, amount, price, original_price, bonus, valid_days, features, is_popular, is_active, created_at) FROM stdin;
1	Pacote Básico	50	45.00	50.00	0	60	{"50 créditos","Válido por 60 dias","Use em qualquer consultor","Suporte 24h"}	f	t	2025-06-06 12:06:55.424139
2	Pacote Popular	100	85.00	100.00	10	90	{"100 créditos + 10 bônus","Válido por 90 dias","Use em qualquer consultor","Desconto em consultas premium","Suporte prioritário"}	t	t	2025-06-06 12:06:55.424139
3	Pacote Premium	250	199.00	250.00	50	120	{"250 créditos + 50 bônus","Válido por 120 dias","Use em qualquer consultor","Acesso a consultores VIP","Transferível para amigos","Suporte VIP 24h"}	f	t	2025-06-06 12:06:55.424139
4	Pacote VIP	500	379.00	500.00	150	180	{"500 créditos + 150 bônus","Válido por 180 dias","Acesso ilimitado","Consultores VIP exclusivos","Relatórios personalizados","Gerente de conta dedicado"}	f	t	2025-06-06 12:06:55.424139
5	Pacote Básico	50	49.00	65.00	10	90	{"Créditos válidos por 90 dias","Suporte 24/7","Sem taxa adicional"}	f	t	2025-06-08 17:00:10.578552
6	Pacote Popular	100	89.00	120.00	20	120	{"100 créditos + 20 bônus","Válido por 120 dias","Desconto em consultas premium","Suporte prioritário"}	t	t	2025-06-08 17:00:10.578552
7	Pacote Premium	200	149.00	200.00	50	150	{"200 créditos + 50 bônus","Válido por 150 dias","Acesso a consultores VIP","Relatórios personalizados"}	f	t	2025-06-08 17:00:10.578552
8	Pacote VIP	350	299.00	400.00	100	180	{"350 créditos + 100 bônus","Válido por 180 dias","Consultores VIP exclusivos","Gerente de conta dedicado"}	f	t	2025-06-08 17:00:10.578552
\.


--
-- Data for Name: credit_transactions; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.credit_transactions (id, user_id, transaction_type, amount, description, consultation_session_id, created_at) FROM stdin;
1	2	bonus	10.00	Bônus de boas-vindas - 10 créditos grátis	\N	2025-06-06 01:44:22.414714
2	3	bonus	10.00	Bônus de boas-vindas - 10 créditos grátis	\N	2025-06-06 01:44:22.414714
3	4	bonus	10.00	Bônus de boas-vindas - 10 créditos grátis	\N	2025-06-06 01:44:22.414714
4	5	bonus	10.00	Bônus de boas-vindas - 10 créditos grátis	\N	2025-06-06 01:44:22.414714
5	6	bonus	10.00	Bônus de boas-vindas - 10 créditos grátis	\N	2025-06-06 01:44:22.414714
6	7	bonus	10.00	Bônus de boas-vindas - 10 créditos grátis	\N	2025-06-06 01:44:22.414714
7	8	bonus	10.00	Bônus de boas-vindas - 10 créditos grátis	\N	2025-06-06 01:44:22.414714
8	9	bonus	10.00	Bônus de boas-vindas - 10 créditos grátis	\N	2025-06-06 01:44:22.414714
9	10	bonus	10.00	Bônus de boas-vindas - 10 créditos grátis	\N	2025-06-06 01:44:22.414714
10	11	bonus	10.00	Bônus de boas-vindas - 10 créditos grátis	\N	2025-06-06 01:44:22.414714
11	12	bonus	10.00	Bônus de boas-vindas - 10 créditos grátis	\N	2025-06-06 01:44:22.414714
12	13	bonus	10.00	Bônus de boas-vindas - 10 créditos grátis	\N	2025-06-06 01:44:22.414714
13	14	bonus	10.00	Bônus de boas-vindas - 10 créditos grátis	\N	2025-06-06 01:44:22.414714
14	15	bonus	10.00	Bônus de boas-vindas - 10 créditos grátis	\N	2025-06-06 01:44:22.414714
15	16	bonus	10.00	Bônus de boas-vindas - 10 créditos grátis	\N	2025-06-06 11:42:50.264472
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.notifications (id, user_id, title, message, type, is_read, action_url, created_at) FROM stdin;
1	2	Bem-vindo ao Conselhos Esotéricos!	Sua jornada espiritual começa aqui. Explore nossos consultores e serviços especializados.	welcome	f	/consultores	2025-06-06 01:44:22.414714
2	3	Bem-vindo ao Conselhos Esotéricos!	Sua jornada espiritual começa aqui. Explore nossos consultores e serviços especializados.	welcome	f	/consultores	2025-06-06 01:44:22.414714
3	4	Bem-vindo ao Conselhos Esotéricos!	Sua jornada espiritual começa aqui. Explore nossos consultores e serviços especializados.	welcome	f	/consultores	2025-06-06 01:44:22.414714
4	5	Bem-vindo ao Conselhos Esotéricos!	Sua jornada espiritual começa aqui. Explore nossos consultores e serviços especializados.	welcome	f	/consultores	2025-06-06 01:44:22.414714
5	6	Bem-vindo ao Conselhos Esotéricos!	Sua jornada espiritual começa aqui. Explore nossos consultores e serviços especializados.	welcome	f	/consultores	2025-06-06 01:44:22.414714
6	7	Bem-vindo ao Conselhos Esotéricos!	Sua jornada espiritual começa aqui. Explore nossos consultores e serviços especializados.	welcome	f	/consultores	2025-06-06 01:44:22.414714
7	8	Bem-vindo ao Conselhos Esotéricos!	Sua jornada espiritual começa aqui. Explore nossos consultores e serviços especializados.	welcome	f	/consultores	2025-06-06 01:44:22.414714
8	9	Bem-vindo ao Conselhos Esotéricos!	Sua jornada espiritual começa aqui. Explore nossos consultores e serviços especializados.	welcome	f	/consultores	2025-06-06 01:44:22.414714
9	10	Bem-vindo ao Conselhos Esotéricos!	Sua jornada espiritual começa aqui. Explore nossos consultores e serviços especializados.	welcome	f	/consultores	2025-06-06 01:44:22.414714
10	11	Bem-vindo ao Conselhos Esotéricos!	Sua jornada espiritual começa aqui. Explore nossos consultores e serviços especializados.	welcome	f	/consultores	2025-06-06 01:44:22.414714
11	12	Bem-vindo ao Conselhos Esotéricos!	Sua jornada espiritual começa aqui. Explore nossos consultores e serviços especializados.	welcome	f	/consultores	2025-06-06 01:44:22.414714
12	13	Bem-vindo ao Conselhos Esotéricos!	Sua jornada espiritual começa aqui. Explore nossos consultores e serviços especializados.	welcome	f	/consultores	2025-06-06 01:44:22.414714
13	14	Bem-vindo ao Conselhos Esotéricos!	Sua jornada espiritual começa aqui. Explore nossos consultores e serviços especializados.	welcome	f	/consultores	2025-06-06 01:44:22.414714
14	15	Bem-vindo ao Conselhos Esotéricos!	Sua jornada espiritual começa aqui. Explore nossos consultores e serviços especializados.	welcome	f	/consultores	2025-06-06 01:44:22.414714
15	16	Bem-vindo ao Conselhos Esotéricos!	Sua jornada espiritual começa aqui. Explore nossos consultores e serviços especializados.	welcome	f	/consultores	2025-06-06 11:42:50.264472
16	1	Bem-vindo ao Conselhos Esotéricos!	Sua jornada espiritual começa aqui. Explore nossos consultores e serviços especializados.	welcome	f	/consultores	2025-06-06 01:44:22.414714
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.order_items (id, order_id, product_id, quantity, unit_price) FROM stdin;
1	1	1	1	2499.99
2	2	2	1	999.99
3	3	3	1	249.99
4	4	4	1	599.99
5	5	5	1	799.99
6	6	6	1	199.99
7	7	7	1	399.99
8	8	8	1	899.99
9	9	9	1	1299.99
10	10	10	1	1199.99
11	11	3	2	249.99
12	11	6	1	149.99
13	12	2	1	999.99
14	12	5	1	799.99
15	13	3	1	249.99
16	13	6	1	199.99
17	14	4	1	299.99
18	15	11	1	999.99
19	16	5	1	799.99
20	16	3	1	29.99
21	17	7	1	399.99
22	17	15	1	179.99
23	18	1	1	2499.99
24	18	14	1	99.99
25	19	12	1	329.99
26	20	15	1	179.99
27	21	9	1	1299.99
28	22	7	1	399.99
29	23	14	1	99.99
30	24	13	1	799.99
31	25	3	1	249.99
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.orders (id, user_id, total_amount, status, order_date, updated_at) FROM stdin;
1	1	2499.99	completed	2025-06-05 01:44:42.068598	2025-06-06 01:44:42.068598
2	2	999.99	completed	2025-06-04 01:44:42.068598	2025-06-06 01:44:42.068598
3	3	249.99	processing	2025-06-05 22:44:42.068598	2025-06-06 01:44:42.068598
4	4	599.99	completed	2025-05-30 01:44:42.068598	2025-06-06 01:44:42.068598
5	5	799.99	pending	2025-06-05 23:44:42.068598	2025-06-06 01:44:42.068598
6	6	199.99	completed	2025-06-03 01:44:42.068598	2025-06-06 01:44:42.068598
7	7	399.99	completed	2025-06-01 01:44:42.068598	2025-06-06 01:44:42.068598
8	8	899.99	processing	2025-06-05 01:44:42.068598	2025-06-06 01:44:42.068598
9	9	1299.99	completed	2025-05-23 01:44:42.068598	2025-06-06 01:44:42.068598
10	10	1199.99	completed	2025-06-02 01:44:42.068598	2025-06-06 01:44:42.068598
11	11	649.98	completed	2025-05-06 01:44:42.068598	2025-06-06 01:44:42.068598
12	12	1799.98	completed	2025-05-16 01:44:42.068598	2025-06-06 01:44:42.068598
13	13	449.98	completed	2025-04-06 01:44:42.068598	2025-06-06 01:44:42.068598
14	14	299.99	cancelled	2025-05-30 01:44:42.068598	2025-06-06 01:44:42.068598
15	15	999.99	completed	2025-05-31 01:44:42.068598	2025-06-06 01:44:42.068598
16	1	829.98	completed	2025-04-06 01:44:42.068598	2025-06-06 01:44:42.068598
17	3	579.98	completed	2025-05-06 01:44:42.068598	2025-06-06 01:44:42.068598
18	5	1599.98	completed	2025-05-16 01:44:42.068598	2025-06-06 01:44:42.068598
19	7	329.99	completed	2025-05-27 01:44:42.068598	2025-06-06 01:44:42.068598
20	9	179.99	completed	2025-05-29 01:44:42.068598	2025-06-06 01:44:42.068598
21	2	1299.99	processing	2025-06-05 20:44:42.068598	2025-06-06 01:44:42.068598
22	4	399.99	pending	2025-06-06 00:44:42.068598	2025-06-06 01:44:42.068598
23	6	99.99	completed	2025-05-23 01:44:42.068598	2025-06-06 01:44:42.068598
24	8	799.99	completed	2025-05-25 01:44:42.068598	2025-06-06 01:44:42.068598
25	10	249.99	completed	2025-05-28 01:44:42.068598	2025-06-06 01:44:42.068598
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.products (id, name, description, price, category, stock_quantity, is_active, created_at, updated_at) FROM stdin;
1	MacBook Pro 16"	Professional laptop with M3 chip and 16GB RAM	2499.99	electronics	25	t	2025-06-06 01:44:32.038064	2025-06-06 01:44:32.038064
2	iPhone 15 Pro	Latest smartphone with titanium design and 48MP camera	999.99	mobile	50	t	2025-06-06 01:44:32.038064	2025-06-06 01:44:32.038064
3	AirPods Pro	Wireless earbuds with active noise cancellation	249.99	audio	100	t	2025-06-06 01:44:32.038064	2025-06-06 01:44:32.038064
4	iPad Air	Tablet for creativity and productivity with M2 chip	599.99	tablet	30	t	2025-06-06 01:44:32.038064	2025-06-06 01:44:32.038064
5	Apple Watch Ultra	Advanced smartwatch for athletes and outdoor enthusiasts	799.99	electronics	15	t	2025-06-06 01:44:32.038064	2025-06-06 01:44:32.038064
6	Magic Keyboard	Wireless keyboard for Mac with backlit keys	199.99	electronics	40	t	2025-06-06 01:44:32.038064	2025-06-06 01:44:32.038064
7	Sony WH-1000XM5	Premium noise-canceling headphones	399.99	audio	35	t	2025-06-06 01:44:32.038064	2025-06-06 01:44:32.038064
8	Samsung Galaxy S24	Android flagship smartphone with AI features	899.99	mobile	45	t	2025-06-06 01:44:32.038064	2025-06-06 01:44:32.038064
9	Microsoft Surface Pro	Versatile 2-in-1 laptop tablet	1299.99	tablet	20	t	2025-06-06 01:44:32.038064	2025-06-06 01:44:32.038064
10	Dell XPS 13	Ultrabook with premium design and InfinityEdge display	1199.99	electronics	18	t	2025-06-06 01:44:32.038064	2025-06-06 01:44:32.038064
11	Google Pixel 8 Pro	AI-powered Android phone with advanced camera	999.99	mobile	32	t	2025-06-06 01:44:32.038064	2025-06-06 01:44:32.038064
12	Bose QuietComfort	Wireless noise-canceling headphones	329.99	audio	28	t	2025-06-06 01:44:32.038064	2025-06-06 01:44:32.038064
13	Samsung Galaxy Tab S9	Premium Android tablet with S Pen	799.99	tablet	22	t	2025-06-06 01:44:32.038064	2025-06-06 01:44:32.038064
14	Logitech MX Master 3S	Advanced wireless mouse for productivity	99.99	electronics	60	t	2025-06-06 01:44:32.038064	2025-06-06 01:44:32.038064
15	JBL Charge 5	Portable Bluetooth speaker with powerbank feature	179.99	audio	45	t	2025-06-06 01:44:32.038064	2025-06-06 01:44:32.038064
\.


--
-- Data for Name: service_categories; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.service_categories (id, name, slug, description, image_url, icon_name, color, price_range, is_active, order_position, created_at) FROM stdin;
1	Tarot	tarot	Consultas de Tarot com especialistas certificados para orientação espiritual e autoconhecimento	/images/services/tarot.jpg	Cards	#6366f1	R$ 35-120	t	1	2025-06-06 12:06:55.424139
2	Astrologia	astrologia	Mapa astral completo, previsões e orientações baseadas na posição dos astros	/images/services/astrologia.jpg	Star	#8b5cf6	R$ 45-150	t	2	2025-06-06 12:06:55.424139
3	Numerologia	numerologia	Análise numerológica personalizada para descobrir seu propósito de vida	/images/services/numerologia.jpg	Calculator	#06b6d4	R$ 40-100	t	3	2025-06-06 12:06:55.424139
4	Mediunidade	mediunidade	Conexão espiritual com orientações de entes queridos e guias espirituais	/images/services/mediunidade.jpg	Zap	#10b981	R$ 50-180	t	4	2025-06-06 12:06:55.424139
5	Runas	runas	Consulta com runas nórdicas para orientação e revelações sobre seu futuro	/images/services/runas.jpg	Hexagon	#f59e0b	R$ 35-90	t	5	2025-06-06 12:06:55.424139
6	Oráculos	oraculos	Consultas com diversos oráculos para respostas claras e objetivas	/images/services/oraculos.jpg	Eye	#ef4444	R$ 40-110	t	6	2025-06-06 12:06:55.424139
7	Reiki	reiki	Sessões de cura energética e limpeza espiritual através do Reiki	/images/services/reiki.jpg	Heart	#ec4899	R$ 60-140	t	7	2025-06-06 12:06:55.424139
8	Cristaloterapia	cristaloterapia	Terapia com cristais para harmonização energética e bem-estar	/images/services/cristaloterapia.jpg	Gem	#84cc16	R$ 45-120	t	8	2025-06-06 12:06:55.424139
\.


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.services (id, name, description, category, base_price, duration, image_url, icon_name, is_active, created_at) FROM stdin;
1	Consulta de Tarot	Leitura completa do tarot com interpretação detalhada	tarot	80.00	30	/images/tarot.jpg	cards	t	2025-06-06 12:53:16.987266
2	Consulta de Astrologia	Mapa astral completo com interpretação personalizada	astrologia	120.00	45	/images/astrology.jpg	star	t	2025-06-06 12:53:16.987266
3	Consulta de Mediunidade	Comunicação espiritual e orientação	mediunidade	100.00	30	/images/medium.jpg	spirit	t	2025-06-06 12:53:16.987266
4	Consulta de Numerologia	Análise numerológica completa do seu destino	numerologia	90.00	30	/images/numerology.jpg	numbers	t	2025-06-06 12:53:16.987266
5	Terapia Holística	Sessão de cura energética e alinhamento dos chakras	terapia	150.00	60	/images/therapy.jpg	healing	t	2025-06-06 12:53:16.987266
6	Consulta de Runas	Leitura das runas nórdicas para orientação	runas	70.00	25	/images/runes.jpg	runes	t	2025-06-06 12:53:16.987266
7	Cristaloterapia	Tratamento com cristais e pedras energéticas	cristaloterapia	110.00	45	/images/crystals.jpg	crystal	t	2025-06-06 12:53:16.987266
8	Leitura de Oráculos	Consulta com diversos oráculos sagrados	oraculos	85.00	30	/images/oracle.jpg	oracle	t	2025-06-06 12:53:16.987266
9	Leitura de Tarot Completa	Análise detalhada com 10 cartas do Tarot Rider-Waite para orientação sobre amor, carreira e espiritualidade	tarot	85.00	45	https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400	sparkles	t	2025-06-06 15:14:01.231113
10	Mapa Natal Personalizado	Interpretação completa do seu mapa astral com análise de planetas, casas e aspectos	astrologia	120.00	60	https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400	moon	t	2025-06-06 15:14:01.231113
11	Consulta de Numerologia	Cálculo e interpretação dos seus números pessoais: vida, destino, alma e personalidade	numerologia	65.00	30	https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400	hash	t	2025-06-06 15:14:01.231113
12	Sessão de Mediunidade	Comunicação espiritual para mensagens de entes queridos e orientação dos guias	mediunidade	95.00	40	https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400	eye	t	2025-06-06 15:14:01.231113
13	Leitura de Runas Vikings	Consulta ancestral com runas nórdicas para orientação e proteção espiritual	runas	75.00	35	https://images.unsplash.com/photo-1518884013496-41ba18df0b9e?w=400	shield	t	2025-06-06 15:14:01.231113
14	Sessão de Reiki	Terapia energética para equilíbrio dos chakras e harmonização das energias vitais	reiki	80.00	50	https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400	zap	t	2025-06-06 15:14:01.231113
15	Cristaloterapia Personalizada	Seleção e programação de cristais específicos para suas necessidades energéticas	cristaloterapia	70.00	40	https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400	gem	t	2025-06-06 15:14:01.231113
16	Consulta com Oráculos	Orientação através de diversos oráculos: anjos, deusas, animais de poder	oraculos	55.00	25	https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400	star	t	2025-06-06 15:14:01.231113
\.


--
-- Data for Name: testimonials; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.testimonials (id, content, author_name, author_location, author_image_url, rating, created_at) FROM stdin;
1	A consulta com Maria Helena foi transformadora! Suas orientações sobre o Tarot me ajudaram a tomar decisões importantes na minha vida. Recomendo demais!	Carla Santos	São Paulo, SP	https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100	5	2025-06-06 15:13:05.961451
2	Carlos Eduardo é um astrólogo excepcional. Sua leitura do meu mapa natal foi precisa e reveladora. Consegui entender melhor meu propósito de vida.	Rafael Oliveira	Rio de Janeiro, RJ	https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100	5	2025-06-06 15:13:05.961451
3	Ana Beatriz tem um dom incrível para a mediunidade. As mensagens que recebi foram reconfortantes e trouxeram paz ao meu coração.	Luciana Costa	Belo Horizonte, MG	https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100	5	2025-06-06 15:13:05.961451
4	Fernanda me ajudou muito com a cristaloterapia. Sinto minha energia muito mais equilibrada após as sessões.	Pedro Silva	Salvador, BA	https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100	4	2025-06-06 15:13:05.961451
5	A numerologia com José Roberto abriu minha mente para possibilidades que eu não via. Excelente profissional!	Amanda Ferreira	Curitiba, PR	https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100	5	2025-06-06 15:13:05.961451
\.


--
-- Data for Name: user_credits; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.user_credits (id, user_id, credits_balance, total_purchased, total_used, created_at, updated_at, total_credits, used_credits, bonus_credits, last_purchase_at) FROM stdin;
16	1	0.00	0.00	0.00	2025-06-08 19:07:14.421454	2025-06-08 19:07:14.421454	0.00	0.00	0.00	\N
1	2	10.00	10.00	0.00	2025-06-08 19:07:14.421454	2025-06-08 19:07:14.421454	0.00	0.00	0.00	\N
2	3	10.00	10.00	0.00	2025-06-08 19:07:14.421454	2025-06-08 19:07:14.421454	0.00	0.00	0.00	\N
3	4	10.00	10.00	0.00	2025-06-08 19:07:14.421454	2025-06-08 19:07:14.421454	0.00	0.00	0.00	\N
4	5	10.00	10.00	0.00	2025-06-08 19:07:14.421454	2025-06-08 19:07:14.421454	0.00	0.00	0.00	\N
5	6	10.00	10.00	0.00	2025-06-08 19:07:14.421454	2025-06-08 19:07:14.421454	0.00	0.00	0.00	\N
6	7	10.00	10.00	0.00	2025-06-08 19:07:14.421454	2025-06-08 19:07:14.421454	0.00	0.00	0.00	\N
7	8	10.00	10.00	0.00	2025-06-08 19:07:14.421454	2025-06-08 19:07:14.421454	0.00	0.00	0.00	\N
8	9	10.00	10.00	0.00	2025-06-08 19:07:14.421454	2025-06-08 19:07:14.421454	0.00	0.00	0.00	\N
9	10	10.00	10.00	0.00	2025-06-08 19:07:14.421454	2025-06-08 19:07:14.421454	0.00	0.00	0.00	\N
10	11	10.00	10.00	0.00	2025-06-08 19:07:14.421454	2025-06-08 19:07:14.421454	0.00	0.00	0.00	\N
11	12	10.00	10.00	0.00	2025-06-08 19:07:14.421454	2025-06-08 19:07:14.421454	0.00	0.00	0.00	\N
12	13	10.00	10.00	0.00	2025-06-08 19:07:14.421454	2025-06-08 19:07:14.421454	0.00	0.00	0.00	\N
13	14	10.00	10.00	0.00	2025-06-08 19:07:14.421454	2025-06-08 19:07:14.421454	0.00	0.00	0.00	\N
14	15	10.00	10.00	0.00	2025-06-08 19:07:14.421454	2025-06-08 19:07:14.421454	0.00	0.00	0.00	\N
15	16	10.00	10.00	0.00	2025-06-08 19:07:14.421454	2025-06-08 19:07:14.421454	0.00	0.00	0.00	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.users (id, username, email, first_name, last_name, created_at, updated_at, password, cpf, phone, credits, bonus_credits, has_received_bonus, first_purchase_completed, role, is_active, profile_image_url) FROM stdin;
1	john_doe	john@example.com	John	Doe	2025-06-06 01:44:22.414714	2025-06-06 12:52:32.626	\N	\N	\N	20.00	10.00	t	t	cliente	t	\N
2	jane_smith	jane@example.com	Jane	Smith	2025-06-06 01:44:22.414714	2025-06-06 01:44:22.414714	\N	\N	\N	0.00	0.00	t	f	cliente	t	\N
3	mike_johnson	mike@example.com	Mike	Johnson	2025-06-06 01:44:22.414714	2025-06-06 01:44:22.414714	\N	\N	\N	0.00	0.00	t	f	cliente	t	\N
4	sarah_wilson	sarah@example.com	Sarah	Wilson	2025-06-06 01:44:22.414714	2025-06-06 01:44:22.414714	\N	\N	\N	0.00	0.00	t	f	cliente	t	\N
5	alex_brown	alex@example.com	Alex	Brown	2025-06-06 01:44:22.414714	2025-06-06 01:44:22.414714	\N	\N	\N	0.00	0.00	t	f	cliente	t	\N
6	emily_davis	emily@example.com	Emily	Davis	2025-06-06 01:44:22.414714	2025-06-06 01:44:22.414714	\N	\N	\N	0.00	0.00	t	f	cliente	t	\N
7	chris_taylor	chris@example.com	Chris	Taylor	2025-06-06 01:44:22.414714	2025-06-06 01:44:22.414714	\N	\N	\N	0.00	0.00	t	f	cliente	t	\N
8	lisa_anderson	lisa@example.com	Lisa	Anderson	2025-06-06 01:44:22.414714	2025-06-06 01:44:22.414714	\N	\N	\N	0.00	0.00	t	f	cliente	t	\N
9	david_martinez	david@example.com	David	Martinez	2025-06-06 01:44:22.414714	2025-06-06 01:44:22.414714	\N	\N	\N	0.00	0.00	t	f	cliente	t	\N
10	nicole_garcia	nicole@example.com	Nicole	Garcia	2025-06-06 01:44:22.414714	2025-06-06 01:44:22.414714	\N	\N	\N	0.00	0.00	t	f	cliente	t	\N
11	robert_lee	robert@example.com	Robert	Lee	2025-06-06 01:44:22.414714	2025-06-06 01:44:22.414714	\N	\N	\N	0.00	0.00	t	f	cliente	t	\N
12	maria_rodriguez	maria@example.com	Maria	Rodriguez	2025-06-06 01:44:22.414714	2025-06-06 01:44:22.414714	\N	\N	\N	0.00	0.00	t	f	cliente	t	\N
13	james_wilson	james@example.com	James	Wilson	2025-06-06 01:44:22.414714	2025-06-06 01:44:22.414714	\N	\N	\N	0.00	0.00	t	f	cliente	t	\N
14	linda_thomas	linda@example.com	Linda	Thomas	2025-06-06 01:44:22.414714	2025-06-06 01:44:22.414714	\N	\N	\N	0.00	0.00	t	f	cliente	t	\N
15	michael_white	michael@example.com	Michael	White	2025-06-06 01:44:22.414714	2025-06-06 01:44:22.414714	\N	\N	\N	0.00	0.00	t	f	cliente	t	\N
18	\N	novo.cliente@example.com	João	Santos	2025-06-09 11:35:22.723639	2025-06-09 11:35:22.723639	$2b$10$MXPgKNNFAgZtDSR/jfS6/OAskiOeC4gddZpjqfJGZiVzbjr61.7ta	98765432100	11988887777	0.00	0.00	f	f	cliente	t	\N
19	\N	teste.cliente.novo@example.com	Ana	Costa	2025-06-09 11:35:45.672528	2025-06-09 11:35:45.672528	$2b$10$QKnREcu3W7qyxNcyt.uNce17SukLX2Bl9rFLXhyZ10Rh7.Z5X6GjO	11122233344	11977776666	0.00	0.00	f	f	cliente	t	\N
20	\N	ana.costa.teste@example.com	Ana	Costa	2025-06-09 11:36:27.151472	2025-06-09 11:36:27.151472	$2b$10$WPUGAvukwP2Boowq5l3.M.UJC.ne1H33n2Op5yqlM.FsX0QrTzm9G	55566677788	11977776666	0.00	0.00	f	f	cliente	t	\N
16	teste@exemplo.com	teste@exemplo.com	João	Silva	2025-06-06 11:42:50.264472	2025-06-06 11:42:50.264472	$2b$10$D7Zmcsq6VcgiojTkDVBG7esqMOhJptd8BM0MpRbOjt/7oJA6yfKk2	12345678901	\N	0.00	0.00	t	f	cliente	t	\N
\.


--
-- Name: analytics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.analytics_id_seq', 30, true);


--
-- Name: banner_slides_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.banner_slides_id_seq', 3, true);


--
-- Name: blog_posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.blog_posts_id_seq', 4, true);


--
-- Name: consultant_availability_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.consultant_availability_id_seq', 56, true);


--
-- Name: consultants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.consultants_id_seq', 8, true);


--
-- Name: consultation_messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.consultation_messages_id_seq', 5, true);


--
-- Name: consultation_rooms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.consultation_rooms_id_seq', 5, true);


--
-- Name: consultation_sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.consultation_sessions_id_seq', 4, true);


--
-- Name: credit_packages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.credit_packages_id_seq', 8, true);


--
-- Name: credit_transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.credit_transactions_id_seq', 15, true);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.notifications_id_seq', 16, true);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.order_items_id_seq', 31, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.orders_id_seq', 25, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.products_id_seq', 15, true);


--
-- Name: service_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.service_categories_id_seq', 10, true);


--
-- Name: services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.services_id_seq', 16, true);


--
-- Name: testimonials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.testimonials_id_seq', 5, true);


--
-- Name: user_credits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.user_credits_id_seq', 16, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.users_id_seq', 20, true);


--
-- Name: analytics analytics_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.analytics
    ADD CONSTRAINT analytics_pkey PRIMARY KEY (id);


--
-- Name: banner_slides banner_slides_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.banner_slides
    ADD CONSTRAINT banner_slides_pkey PRIMARY KEY (id);


--
-- Name: blog_posts blog_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_pkey PRIMARY KEY (id);


--
-- Name: blog_posts blog_posts_slug_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_slug_key UNIQUE (slug);


--
-- Name: consultant_availability consultant_availability_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.consultant_availability
    ADD CONSTRAINT consultant_availability_pkey PRIMARY KEY (id);


--
-- Name: consultants consultants_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.consultants
    ADD CONSTRAINT consultants_pkey PRIMARY KEY (id);


--
-- Name: consultation_messages consultation_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.consultation_messages
    ADD CONSTRAINT consultation_messages_pkey PRIMARY KEY (id);


--
-- Name: consultation_rooms consultation_rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.consultation_rooms
    ADD CONSTRAINT consultation_rooms_pkey PRIMARY KEY (id);


--
-- Name: consultation_rooms consultation_rooms_room_id_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.consultation_rooms
    ADD CONSTRAINT consultation_rooms_room_id_key UNIQUE (room_id);


--
-- Name: consultation_sessions consultation_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.consultation_sessions
    ADD CONSTRAINT consultation_sessions_pkey PRIMARY KEY (id);


--
-- Name: consultation_sessions consultation_sessions_room_id_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.consultation_sessions
    ADD CONSTRAINT consultation_sessions_room_id_key UNIQUE (room_id);


--
-- Name: credit_packages credit_packages_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.credit_packages
    ADD CONSTRAINT credit_packages_pkey PRIMARY KEY (id);


--
-- Name: credit_transactions credit_transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.credit_transactions
    ADD CONSTRAINT credit_transactions_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: service_categories service_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.service_categories
    ADD CONSTRAINT service_categories_pkey PRIMARY KEY (id);


--
-- Name: service_categories service_categories_slug_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.service_categories
    ADD CONSTRAINT service_categories_slug_key UNIQUE (slug);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- Name: testimonials testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_pkey PRIMARY KEY (id);


--
-- Name: user_credits user_credits_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_credits
    ADD CONSTRAINT user_credits_pkey PRIMARY KEY (id);


--
-- Name: users users_cpf_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_cpf_key UNIQUE (cpf);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: consultant_availability consultant_availability_consultant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.consultant_availability
    ADD CONSTRAINT consultant_availability_consultant_id_fkey FOREIGN KEY (consultant_id) REFERENCES public.consultants(id);


--
-- Name: consultation_messages consultation_messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.consultation_messages
    ADD CONSTRAINT consultation_messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id);


--
-- Name: consultation_messages consultation_messages_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.consultation_messages
    ADD CONSTRAINT consultation_messages_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.consultation_sessions(id);


--
-- Name: consultation_sessions consultation_sessions_consultant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.consultation_sessions
    ADD CONSTRAINT consultation_sessions_consultant_id_fkey FOREIGN KEY (consultant_id) REFERENCES public.consultants(id);


--
-- Name: credit_transactions credit_transactions_consultation_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.credit_transactions
    ADD CONSTRAINT credit_transactions_consultation_session_id_fkey FOREIGN KEY (consultation_session_id) REFERENCES public.consultation_sessions(id);


--
-- Name: credit_transactions credit_transactions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.credit_transactions
    ADD CONSTRAINT credit_transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: consultation_rooms fk_consultation_rooms_client; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.consultation_rooms
    ADD CONSTRAINT fk_consultation_rooms_client FOREIGN KEY (client_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: consultation_rooms fk_consultation_rooms_consultant; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.consultation_rooms
    ADD CONSTRAINT fk_consultation_rooms_consultant FOREIGN KEY (consultant_id) REFERENCES public.consultants(id) ON DELETE CASCADE;


--
-- Name: notifications notifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

