infile = 'p_store_v4.wav';

[x, fs] = audioread(infile);
x = mean(x, 2);

% Settings
win_sec = 3;        % window length for measuring RMS
smooth_sec = 1;     % smoothing so gain changes are gradual
target_rms = rms(x); % match overall original level

win = round(win_sec * fs);
smooth_win = round(smooth_sec * fs);

% Moving RMS
x_squared = x.^2;
local_rms = sqrt(movmean(x_squared, win));

% Avoid huge boosts during silence
floor_rms = 0.1 * median(local_rms(local_rms > 0));
local_rms(local_rms < floor_rms) = floor_rms;

% Gain needed at each time point
gain = target_rms ./ local_rms;

% Smooth gain changes
gain = movmean(gain, smooth_win);

% Apply gain
x_fixed = x .* gain;

% Prevent clipping
peak = max(abs(x_fixed));
if peak > 0.99
    x_fixed = x_fixed / peak * 0.99;
end

audiowrite('p_store_v4_smoothed.wav', x_fixed, fs);

fprintf('Saved p_store_v4_smoothed\n');