// Generouted, changes to this file will be overriden
import { components, hooks, utils } from "@generouted/react-router/client";

export type Path = `/` | `/astronauts` | `/forgot-password` | `/iss-location` | `/login` | `/sign-up`;

export type Params = {};

export type ModalPath = never;

export const { Link, Navigate } = components<Path, Params>();
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>();
export const { redirect } = utils<Path, Params>();
