PGDMP                 
        {            docook_desarrollo    15.2    15.2                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            	           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            
           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    32972    docook_desarrollo    DATABASE     �   CREATE DATABASE docook_desarrollo WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Argentina.1252';
 !   DROP DATABASE docook_desarrollo;
                postgres    false            �            1259    32977    historia    TABLE     �   CREATE TABLE public.historia (
    id_historia integer NOT NULL,
    id_paciente integer NOT NULL,
    id_doctor integer,
    desc_historia character varying NOT NULL,
    id integer
);
    DROP TABLE public.historia;
       public         heap    postgres    false            �            1259    32976    historia_id_historia_seq    SEQUENCE     �   CREATE SEQUENCE public.historia_id_historia_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.historia_id_historia_seq;
       public          postgres    false    215                       0    0    historia_id_historia_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.historia_id_historia_seq OWNED BY public.historia.id_historia;
          public          postgres    false    214            �            1259    32986    usuario    TABLE       CREATE TABLE public.usuario (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    password character varying(255),
    email character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    profile character varying(100)
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            �            1259    32985    usuario_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.usuario_id_seq;
       public          postgres    false    217                       0    0    usuario_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;
          public          postgres    false    216            j           2604    32980    historia id_historia    DEFAULT     |   ALTER TABLE ONLY public.historia ALTER COLUMN id_historia SET DEFAULT nextval('public.historia_id_historia_seq'::regclass);
 C   ALTER TABLE public.historia ALTER COLUMN id_historia DROP DEFAULT;
       public          postgres    false    215    214    215            k           2604    32989 
   usuario id    DEFAULT     h   ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);
 9   ALTER TABLE public.usuario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217                      0    32977    historia 
   TABLE DATA           Z   COPY public.historia (id_historia, id_paciente, id_doctor, desc_historia, id) FROM stdin;
    public          postgres    false    215   �                 0    32986    usuario 
   TABLE DATA           Q   COPY public.usuario (id, name, password, email, created_at, profile) FROM stdin;
    public          postgres    false    217   �                  0    0    historia_id_historia_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.historia_id_historia_seq', 34, true);
          public          postgres    false    214                       0    0    usuario_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.usuario_id_seq', 28, true);
          public          postgres    false    216            n           2606    32984    historia historia_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.historia
    ADD CONSTRAINT historia_pkey PRIMARY KEY (id_historia);
 @   ALTER TABLE ONLY public.historia DROP CONSTRAINT historia_pkey;
       public            postgres    false    215            p           2606    32996    usuario usuario_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_key UNIQUE (email);
 C   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_key;
       public            postgres    false    217            r           2606    32993    usuario usuario_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    217            s           2606    41177    historia historia_id_fkey    FK CONSTRAINT     u   ALTER TABLE ONLY public.historia
    ADD CONSTRAINT historia_id_fkey FOREIGN KEY (id) REFERENCES public.usuario(id);
 C   ALTER TABLE ONLY public.historia DROP CONSTRAINT historia_id_fkey;
       public          postgres    false    3186    215    217               �   x��QK� ]�)�Fh�g�z�n(��!�j��w ��M4B�}2oF2Ag�Ngu����k���\�*�*�t-C�*0C���� :x�[�#�Lp!&X�oYY������UJѰɢǙJ��5	_�)�p�d�~��ܔ;�|el�2ĲDp�]'L>��A.׬f���08RV�>?���`r&j�5�]VU18��f�1bY'7��	���;���         �  x�u��r�\���*��m�V�"*� b�ހ��ʠ����1	v�ձ`U|��~�r���=�)&���ŏ/�_���mz�~/���qZ�&�����_ ��OB�%a�B&@��[,D��z���������&�..C;�SoïY���rCF��+I���D	%ql��41��'��ݧ�C4e�y 
����6���%�afQ]��b�K�a����4</�����bg�iZ) _+��)�K�� #�tXAu��&�@�Ω֛��*@����컹���U�&�ޞ�4��U��
��� O%�Ai�Nԁ-�ȳj8ډ���Dg�$.�21{�{���h��Í�x�d�̲��� }c �gd(�T��L����_:>����0�M~���QY�����Q����aS7�аY����0_����8�	�1� A]��ϻs�����!�d������:*3�X��e>P���$�0_M&����.�΅���O$����H߻�����ʙ��d���f�}��^D!�JT�):�_���~�o����.�C�?�N��h�p���_%�\m��8�v�;ܸ�Ɖ��Q������R�P���(�_|�'2�<Ř	��#�}d���#�b筆����=ߛ{���N��ʉ��\�����7b՟���K�1�-f���� ܁C��	��E�Ij��N�A=�55���hld����Xլ�&x���_�-Ȉ�T�"��17I�3/~d�i��0=��v��cI7qS�NE��i0�LZ�ҠO ���+/����m��2�@�w���{�R:pM%}*Nh��={	����ʿ��溆���k��y������]/(�?2�´����322�<j���!���1
��=q4�w�ݷz����Řƃ��7�c�]T�d*DZ�6�"d����K�t?T�I���g(|���v`�	��W�W�2���4��t���V�ӜG��V�U2zO�I ���m�h�}i<xk�(1��	���O�Y�1���o��Ao�<�5x��a�8���P�J��3��w�-��n"�[�	e�n��D���m�������3wIt.��	[�tbҋ�\Ns'M��=4�u�μ�؆�X���Ƌ�3�U_�:���[�p;f)Ō}T s�[��o����?�M_�     