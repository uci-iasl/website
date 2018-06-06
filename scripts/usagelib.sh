# bash(1) helper functions for scripting minutiae.

argv0="$(basename "$0")"

log() { printf '%s: %s\n' "$argv0" "$*" >&2; }
panic() { log "$@"; exit 1; }
usage() {
	printf 'usage: %s %s\n' "$argv0" "$usage" >&2
	[[ $# -gt 0 ]] && log "$@"
	exit 2
}
usagebadopt() {
	case $1 in
	:)	usage "missing argument for option -$OPTARG";;
	\?)	usage "unknown option -$OPTARG";;
	esac
}
