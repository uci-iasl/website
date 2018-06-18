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

abspath() {
	local dir="$1" file
	if [[ ! -d $dir ]]; then
		file="$(basename "$dir")"
		dir="$(dirname "$dir")"
	fi
	printf %s "$(cd "$dir"; pwd)/$file"
}
